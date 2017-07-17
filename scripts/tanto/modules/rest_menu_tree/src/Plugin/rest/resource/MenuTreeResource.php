<?php

namespace Drupal\rest_menu_tree\Plugin\rest\resource;

use Drupal\Core\Access\AccessibleInterface;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Cache\CacheableResponseInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Menu\MenuLinkInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\system\MenuInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Psr\Log\LoggerInterface;

/**
 * Provides a resource to get view modes by entity and bundle.
 *
 * @RestResource(
 *   id = "menu_tree",
 *   label = @Translation("Menu Tree"),
 *   serialization_class = "Drupal\system\Entity\Menu",
 *   uri_paths = {
 *     "canonical" = "/entity/menu/{menu}/tree"
 *   }
 * )
 */
class MenuTreeResource extends ResourceBase {

  /**
   * Menu Tree.
   *
   * @var \Drupal\Core\Menu\MenuLinkTreeInterface
   */
  protected $menuTree;

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    MenuLinkTreeInterface $menu_tree,
    EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->menuTree = $menu_tree;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('menu.link_tree'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function get(MenuInterface $menu) {
    $params = new MenuTreeParameters();
    $tree = $this->menuTree->load($menu->id(), $params);

    // Ensure that every item has an access response, if possible.
    $this->addAccess($tree);

    // Maintain a clean version of the tree for adding cache metadata to the
    // response.
    $clean = $tree;

    // Remove items the user does not have access to.
    $this->checkAccess($tree);

    // Remove the keys to prevent reordering.
    $this->removeKeys($tree);

    $response = new ResourceResponse($tree);

    // First add every item to the cache.
    $response->addCacheableDependency($menu);
    // Always use the clean version of the tree so every link is cached,
    // regardless of whether it's accessible to the current user or not.
    $this->addCacheDependencies($clean, $response);

    return $response;
  }

  /**
   * Remove array keys.
   *
   * Javascript will re-sort the array based on the key. To prevent this, we'll
   * remove the array keys.
   */
  protected function removeKeys(array &$data) {
    $tree = [];
    foreach ($data as $value) {
      if ($value->subtree) {
        $this->removeKeys($value->subtree);
      }

      $tree[] = $value;
    }

    $data = $tree;
  }

  /**
   * Add Access.
   *
   * Ensure that every item has an access result, if possible.
   */
  protected function addAccess(array $data) {
    foreach ($data as $value) {
      if ($value->access === NULL && $value->link instanceof AccessibleInterface) {
        $value->access = $value->link->access('view', NULL, TRUE);
      }

      if ($value->subtree) {
        $this->addAccess($value->subtree);
      }
    }
  }

  /**
   * Check Access.
   *
   * Remove items the user does not have access to from the response.
   */
  protected function checkAccess(array &$data) {
    foreach ($data as $key => $value) {

      // Use the menu links' access result.
      if ($value->access instanceof AccessResultInterface) {
        if (!$value->access->isAllowed()) {
          unset($data[$key]);
          continue;
        }
      }
      // If there is no access result, assume our own access check.
      elseif (!$value->link->isEnabled()) {
        unset($data[$key]);
        continue;
      }

      if ($value->subtree) {
        $this->checkAccess($value->subtree);
      }
    }
  }

  /**
   * Add Cache Tags.
   */
  protected function addCacheDependencies(array $data,
                                          CacheableResponseInterface $response) {
    foreach ($data as $value) {

      // Gather the access cacheability of every item in the menu link tree,
      // including inaccessible items. This allows us to render cache the menu
      // tree, yet still automatically vary the rendered menu by the same cache
      // contexts that the access results vary by.
      // However, if $value->access is not an AccessResultInterface object, this
      // will still render the menu link, because this method does not want to
      // require access checking to be able to render a menu tree.
      if ($value->access instanceof AccessResultInterface) {
        $response->addCacheableDependency($value->access);
      }

      // Gather the cacheability of every item in the menu link tree. Some links
      // may be dynamic: they may have a dynamic text (e.g. a "Hi, <user>" link
      // text, which would vary by 'user' cache context), or a dynamic route
      // name or route parameters.
      $response->addCacheableDependency($value->link);

      // There may be additional dependencies that must be manually determined.
      $this->addLinkCacheDependencies($value->link, $response);

      if ($value->subtree) {
        $this->addCacheDependencies($value->subtree, $response);
      }
    }
  }

  /**
   * Add Cache Tags.
   */
  protected function addLinkCacheDependencies(MenuLinkInterface $link,
                                              CacheableResponseInterface $response) {
    $entity_type = NULL;
    $entity_type_id = $link->getBaseId();
    $uuid = $link->getDerivativeId();

    if ($link instanceof EntityInterface) {
      $entity_type = $link->getEntityType();
    }
    else {
      try {
        $entity_type = $this->entityTypeManager->getDefinition($entity_type_id);
      }
      catch (\Exception $e) {
        // Silence is golden.
      }
    }

    if (!$entity_type) {
      return;
    }

    // Add the list cache tags.
    $cache = new CacheableMetadata();
    $cache->addCacheTags($entity_type->getListCacheTags());
    $response->addCacheableDependency($cache);

    // If the link is an entity already, the cache tags were added in
    // ::addCacheDependencies().
    if ($link instanceof EntityInterface) {
      return;
    }

    // Get the entity.
    $entity = NULL;
    $storage = $this->entityTypeManager->getStorage($entity_type_id);
    $metadata = $link->getMetaData();

    if (!empty($metadata['entity_id'])) {
      $entity = $storage->load($metadata['entity_id']);
    }
    else {
      $entities = $storage->loadByProperties([
        $entity_type->getKey('uuid') => $uuid,
      ]);
      $entity = reset($entities);
    }

    if (!$entity) {
      return;
    }

    $response->addCacheableDependency($entity);
  }

  /**
   * {@inheritdoc}
   */
  protected function getBaseRoute($canonical_path, $method) {
    $route = parent::getBaseRoute($canonical_path, $method);

    $parameters = $route->getOption('parameters') ?: array();
    $parameters['menu']['type'] = 'entity:menu';
    $route->setOption('parameters', $parameters);

    return $route;
  }

}

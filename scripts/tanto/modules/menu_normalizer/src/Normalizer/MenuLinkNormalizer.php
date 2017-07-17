<?php

namespace Drupal\menu_normalizer\Normalizer;

use Drupal\serialization\Normalizer\NormalizerBase;

/**
 * MenuLinkTreeElement Normalizer.
 */
class MenuLinkNormalizer extends NormalizerBase {


  protected $supportedInterfaceOrClass = 'Drupal\Core\Menu\MenuLinkInterface';

  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = NULL, array $context = array()) {

    return [
      'weight' => $object->getWeight(),
      'title' => $object->getTitle(),
      'description' => $object->getDescription(),
      'menu_name' => $object->getMenuName(),
      'provider' => $object->getProvider(),
      'parent' => $object->getParent(),
      'enabled' => $object->isEnabled(),
      'expanded' => $object->isExpanded(),
      'resettable' => $object->isResettable(),
      'translatable' => $object->isTranslatable(),
      'deletable' => $object->isDeletable(),
      'route_name' => $object->getRouteName(),
      'route_parameters' => $object->getRouteParameters(),
      'url' => $object->getUrlObject()->toString(),
      'options' => $object->getOptions(),
      'meta_data' => $this->serializer->normalize($object->getMetaData(), $format, $context),
      'delete_route' => $object->getDeleteRoute(),
      'edit_route' => $object->getEditRoute(),
    ];
  }

}

# Link

Use this component anywhere you would use [React Router's](https://github.com/ReactTraining/react-router) `<Link>`. It acts as a simple wrapper that pre-checks a link's url:

* If the url is falsey, it outputs a tabbable `<a>`.
* If the url is external, it outputs an `<a>`.
* If the url's location should be handled by server routing, it uses [a small hack](https://github.com/ReactTraining/react-router/issues/3109#issuecomment-189782650) to bypass client routing and send a request to the server.

---

## Related components

* [Button](/src/client/components/atoms/button) ([atom](src/client/components/atoms))

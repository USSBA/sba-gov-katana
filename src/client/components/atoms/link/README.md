# Link

Use this component anywhere you would use [React Router's](https://github.com/ReactTraining/react-router) `<Link>`. It acts as a simple wrapper that pre-checks a link's url (`to`):

* If the url is falsey, it outputs a tabbable `<a>`.
* If the url is external, it outputs an `<a>`.
* If the url should be handled by server routing, it uses [a small hack](https://github.com/ReactTraining/react-router/issues/3109#issuecomment-189782650) to bypass client routing and send a request to the server.

| Prop | Type | Description | Default
| --- | --- | --- | ---
| `to` | `{ pathname: string }` \| `string` | If passed as an `object`, the `pathname` key is **required**. A url to a linked resource or location. | -

---

## Related components

* [Button](/src/client/components/atoms/button) ([atom](/src/client/components/atoms))

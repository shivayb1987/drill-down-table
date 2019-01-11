import React from "react"
import { getClients } from "./Utils"

export default class Clients extends React.Component {
  state = {
    list: []
  }

  componentDidMount() {
    this.setState({
      list: getClients()
    })
  }

  render() {
    return (
      <>
        <div className="Clients-searchBox">
          <aside>
            &#128269;{" "}
            <input
              type="text"
              id="site-search"
              name="q"
              aria-label="Search through site content"
            />
          </aside>
        </div>
        <ul className="Clients-listContainer">
          {this.state.list.map(client => (
            <li key={client.id}>
              <span className="clientList-id">{client.id}</span>
              <span className="clientList-name">{client.name}</span>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

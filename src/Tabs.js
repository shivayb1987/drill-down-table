import React from "react"
import classnames from "classnames"

class Tabs extends React.Component {
  state = {
    currentIndex: 1
  }

  onChange = index => {
    this.setState({
      currentIndex: index
    })
  }

  render() {
    return (
      <div>
        <nav>
          <ul className="tabs_container">
            {this.props.items.map((item, index) => (
              <li
                onClick={() => this.onChange(index)}
                className={classnames(
                  "tabs_tab",
                  "font_white",
                  index === this.state.currentIndex && "active"
                )}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <main>
          {React.cloneElement(this.props.children[this.state.currentIndex])}
        </main>
      </div>
    )
  }
}

export default Tabs

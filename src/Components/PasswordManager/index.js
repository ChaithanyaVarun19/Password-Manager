import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBgClassNames = [
  'red',
  'blue',
  'green',
  'violet',
  'indigo',
  'yellow',
  'cyan',
]

class PasswordManager extends Component {
  state = {
    userDetailsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    checked: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddDetailsToList = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBgColorClassNames = `initial_container ${
      initialContainerBgClassNames[
        Math.ceil(Math.random() * initialContainerBgClassNames.length - 1)
      ]
    }`
    const newUser = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBgColorClassNames,
    }

    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, newUser],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  deleteUserDetails = Id => {
    const {userDetailsList} = this.state
    this.setState({
      userDetailsList: userDetailsList.filter(
        userDetails => userDetails.id !== Id,
      ),
    })
  }

  render() {
    const {
      userDetailsList,
      websiteInput,
      usernameInput,
      passwordInput,
      checked,
      searchInput,
    } = this.state
    const searchedResult = userDetailsList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let Output
    if (userDetailsList.length === 0 || searchedResult.length === 0) {
      Output = (
        <div className="no-results-container">
          <img
            className="no-password-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-heading">No Passwords</p>
        </div>
      )
    } else {
      Output = (
        <ul className="unordered-list-container">
          {searchedResult.map(eachObject => (
            <PasswordItem
              key={eachObject.id}
              userDetails={eachObject}
              checked={checked}
              deleteUserDetails={this.deleteUserDetails}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="app_container">
        <div className="responsive_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app_logo"
          />
          <div className="userDetails_container">
            <div className="add_userDetail_container">
              <form className="form" onSubmit={this.onAddDetailsToList}>
                <h1 className="form_heading">Add New Passwords</h1>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="form_input"
                    value={websiteInput}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form_input"
                    value={usernameInput}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form_input"
                    value={passwordInput}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button type="submit" className="add_button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password_manager_image"
              />
            </div>
          </div>
          <div className="userDetailsList_container">
            <div className="header_container">
              <div className="header_heading_container">
                <h1 className="your_passwords_heading">Your Passwords</h1>
                <p className="count">{userDetailsList.length}</p>
              </div>
              <div className="search_container">
                <div className="search_icon_container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search_icon"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search_input"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
            <hr className="breakout_line" />
            <div className="check_box_container">
              <input
                id="checkBox"
                type="checkbox"
                className="check_box"
                value={checked}
                onChange={this.onCheckBox}
              />
              <label htmlFor="checkBox" className="label_text">
                Show Passwords
              </label>
            </div>
            <div className="userPasswordDetailsList">{Output}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager

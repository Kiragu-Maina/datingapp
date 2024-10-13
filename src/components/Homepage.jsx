const Homepage = ({ loggedin }) => {
  return (
    <div>
    <h1>Welcome to the Homepage</h1>
    <p>Status: {loggedin}</p>
  </div>
  )
}

export default Homepage
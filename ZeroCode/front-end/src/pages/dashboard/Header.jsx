export default function Header() {
  return (
    <header className="navbar navbar-dark bg-primary fixed-top shadow">
      <div className="container-fluid d-flex justify-content-between">
        <h1 className="navbar-brand mb-0 h1">Bank Dashboard</h1>
        <nav>
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Help</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

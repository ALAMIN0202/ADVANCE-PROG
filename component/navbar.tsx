import Link from "next/link";

export default function NavBar() {
  return (
    <div className="navbar-container px-4 py-2">
      <div className="navbar bg-blue-500">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <button className="btn btn-ghost text-xl">
            <Link href="/">ADMIN CONTROL PANEL</Link>
          </button>
        </div>
        <div className="navbar-center hidden lg:flex flex-col gap-5">
          <form className="menu flex gap-8">
            <button className="btn btn-ghost mb-4">
              <Link href="/">Home</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/admin_login">Login</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/admin_reg">Admin registration</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/clientlist">Clientlist</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/getbyadmin">Alllist</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/admin_reg_mod">Registation Moderator</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/admin_s_mod">searchmoderator</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/sendmail">sendmail</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/update_admin">updateadmininfo</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/addclients">addclients</Link>
            </button>
            <button className="btn btn-ghost mb-4">
              <Link href="/admin/workerslist">workerslist</Link>
            </button>
          </form>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
}

let NavbarComponent = {
  render: async function () {
    let view = `
             <nav>
                <ul class='navbar'>
                    <li class='navbar__item'>
                        <a class='navbar__link' href="/#/users/">USERS</a>
                    </li>
                    <li class='navbar__item'>
                    <a class='navbar__link' href="/#/repos">REPOS</a>
                    </li>
                </ul>
            </nav>
        `;
    return view;
  },
  after_render: async () => {
    let elems = document.querySelectorAll(".navbar__link");
    let activeTab = location.hash.match(/[a-zA-Z]+/g);
    if (activeTab) {
      elems.forEach((el) => {
        if (el.innerHTML === activeTab.toString().toUpperCase()) {
          el.classList.add("navbar__link--active");
        }
      });
    } else {
      elems[0].classList.add("navbar__link--active");
    }
  },
};

export default NavbarComponent;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-app';

  ngOnInit(): void {
    let navbarlinks = document.querySelectorAll('#navbar .scrollto')
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hasAttribute('class')) return
        let section = document.querySelector(navbarlink.getAttribute('class')!)
        if (!section) return
        if (position >= section.clientTop && position <= (section.clientTop + section.clientHeight)) {
          console.log("ACTIVE")
          navbarlink.classList.add('active')
        } else {
          console.log("NOOO ACTIVE")
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    document.addEventListener('scroll', navbarlinksActive)

    let backtotop = document.querySelector('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop?.classList.add('active')
      } else {
        backtotop?.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    document.addEventListener('scroll', toggleBacktotop);
    }

    let mobilenavtoggle = document.querySelector('.mobile-nav-toggle')
    mobilenavtoggle?.addEventListener('click', () =>{
      document.querySelector('#navbar')?.classList.toggle('navbar-mobile')
      mobilenavtoggle?.classList.toggle('bi-list')
      mobilenavtoggle?.classList.toggle('bi-x')
    });

    let navbardropdown = document.querySelectorAll('.navbar .dropdown > a')
    navbardropdown.forEach(element => {
      element.addEventListener('click', (e) =>{
        e.preventDefault()
        element.nextElementSibling?.classList.toggle('dropdown-active')
      });
    });

    let scrollto = document.querySelectorAll('.scrollto')
    scrollto.forEach(element => {
      element.addEventListener('click', () =>{
        if (element.hasAttribute('href')) {
          let navbar = document.querySelector('#navbar')
          if (navbar?.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile')
            let navbarToggle = document.querySelector('.mobile-nav-toggle')
            navbarToggle?.classList.toggle('bi-list')
            navbarToggle?.classList.toggle('bi-x')
          }
          let offset = document.querySelector('#header')!.clientTop
          let elementPos = document.querySelector(element.getAttribute('href')!)!.clientHeight
          window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
          })
        }
      });
    });
  }
}

import React from "react";
import "./footer.css";
const Foot = () => (
  <>
    <footer class="footer">
      <div class="footer__addr">
        <h1 class="footer__logo">SoleFactory</h1>

        <h2>Contact</h2>

        <address>
          Indore:Raipur:Patna:Shivpuri
          <br />
          <a class="footer__btn" href="mailto:tanishq.malu.18@gmail.com">
            Email Us
          </a>
        </address>
      </div>

      <ul class="footer__nav">
        <li class="nav__item">
          <h2 class="nav__title">Madhur Malpani</h2>

          <ul class="nav__ul">
            <li>
              <a
                href="https://www.linkedin.com/in/madhur-malpani-818646196/"
                target="_blank"
              >
                Linked In
              </a>
            </li>

            <li>
              <a href="https://github.com/madris112" target="_blank">
                Github
              </a>
            </li>

            <li>
              <a href="mailto:madhur.nilu@gmail.com">Email</a>
            </li>
          </ul>
        </li>
        <li class="nav__item">
          <h2 class="nav__title">Srajan Khandelwal</h2>

          <ul class="nav__ul">
            <li>
              <a href="https://www.linkedin.com/in/srajan-khandelwal-b32893194/">Linked In</a>
            </li>

            <li>
              <a href="https://github.com/srajankhandelwal">Github</a>
            </li>

            <li>
              <a href="mailto:srajankhandelwal@gmail.com">Email</a>
            </li>
          </ul>
        </li>
        <li class="nav__item">
          <h2 class="nav__title">Sushant Sinha</h2>

          <ul class="nav__ul">
            <li>
              <a href="https://www.linkedin.com/in/sushantsinha0828/">Linked In</a>
            </li>

            <li>
              <a href="https://github.com/sushant52">Github</a>
            </li>

            <li>
              <a href="mailto:sinhasushant52@gmail.com">Email</a>
            </li>
          </ul>
        </li>
        <li class="nav__item">
          <h2 class="nav__title">Tanishq Malu</h2>

          <ul class="nav__ul">
            <li>
              <a href="https://linkedin/in/tanishqmalu" target="_blank">
                Linked In
              </a>
            </li>

            <li>
              <a href="#">Github</a>
            </li>

            <li>
              <a href="#">Email</a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="legal">
        <div class="legal__links">
          <span>
            Made with <span class="heart">♥</span> by Bit Predators
          </span>
        </div>
      </div>
    </footer>
  </>
);

export default Foot;

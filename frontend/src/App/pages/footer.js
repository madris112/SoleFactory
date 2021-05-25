import React from "react";
import './footer.css';
const Foot = () => (
  <>

<footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo">Sole Factory</h1>

    <h2>Contact</h2>

    <address>
      Indore:Raipur:Patna:Shivpuri<br />

      <a class="footer__btn" href="mailto:example@gmail.com">Email Us</a>
    </address>
  </div>

  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title">Madhur Malpani</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Linked In</a>
        </li>

        <li>
          <a href="#">Github</a>
        </li>

        <li>
          <a href="#">Email</a>
        </li>
      </ul>
    </li>
    <li class="nav__item">
      <h2 class="nav__title">Srajan Khandelwal</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Linked In</a>
        </li>

        <li>
          <a href="#">Github</a>
        </li>

        <li>
          <a href="#">Email</a>
        </li>
      </ul>
    </li>
    <li class="nav__item">
      <h2 class="nav__title">Sushant Sinha</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Linked In</a>
        </li>

        <li>
          <a href="#">Github</a>
        </li>

        <li>
          <a href="#">Email</a>
        </li>
      </ul>
    </li>
    <li class="nav__item">
      <h2 class="nav__title">Tanishq Malu</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Linked In</a>
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
    {/* <p>Amazon Hackathon 2.0</p> */}

    <div class="legal__links">
      <span>Made with <span class="heart">♥</span> by Bit Predators</span>
    </div>
  </div>
</footer>
  </>
);

export default Foot;

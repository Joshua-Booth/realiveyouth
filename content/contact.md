---
title: "Contact"
layout: "contact"
---

<form name="contact" accept-charset="utf-8" action="https://formspree.io/equippedyouthmanual@gmail.com" method="post">
  <fieldset class="uk-fieldset uk-text-center">
    <div class="uk-margin">
        <input class="uk-input border-rounded uk-padding-small type="text" name="name" id="full-name" placeholder="Name" required="">
    </div>
    <div class="uk-margin">
        <input class="uk-input border-rounded uk-padding-small type="email" name="_replyto" id="email-address" placeholder="Email" required="">
    </div>
    <div class="uk-margin">
        <textarea class="uk-textarea border-rounded uk-padding-small" rows="5" name="message" id="message" placeholder="Your message here" required=""></textarea>
    </div>
    <input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission">
    <input class="uk-button uk-button-default border-rounded uk-text-center" type="submit" value="Submit">
  </fieldset>
</form>
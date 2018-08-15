# Fake "Payment Successful" page (Chrome extension)
Ever had fun with scam technical support, and wanted to continue past the "making payment" to see what will happen had you really paid for their services? This extension will allow you to (hopefully) trick them, and they will see a fake "payment success" page. You may find the full chrome extension [here](https://chrome.google.com/webstore/detail/paymet-successful-page/gmocifagomhgblnjgocdgbngkamdcfop)

# Usage
In order to use the extension, you have to press CTRL + M combination. After that, if you click on any link, press any button or submit any form, browser will show a fake "payment success" page.

*Note:* It is reported that *sometimes* the extension doesn't work. The reason is because browser didn't focus the page (happens if you have just opened a new tab, etc.). In order to be 100% sure that CTRL + M combination will work, click anywhere on a website before pressing CTRL + M, to make browser focus the page.

# Contributing
Feel free to clone/fork this repository as you wish. However, if somebody is willing to submit a PR to make the look of the fake page more beautiful, I will be more than happy to accept it.

# Custom look of fake page
Clone this repository. After that, you can edit the file `success_body_only.html` in order to make the payment page look as you wish. Additionaly, you may want to edit `success_head_only.html` to change head of the page (change title of the tab for example).

*Note:* Don't add `head` or `body` elements to these files. Extension will automatically insert these files into already existing head and body of the page.

After you've edited the page(s), you'll have to add it to chrome yourself.

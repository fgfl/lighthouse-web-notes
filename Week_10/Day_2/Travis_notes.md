## Feature Testing with RSpec and Rails

We started the lecture with a review of all things testing, and
ended it by looking at feature testing with Rails.
For our feature tests we used rspec + capybara + phantomJS

The notes below are courtesy of Karl!

Slides and notes are available at
https://github.com/jensen/rspec-notes/. The old lecture from
monday has slides and notes as well
https://github.com/jensen/testing-notes.

---

## Strategic Testing

The decisions you make while writing software are important. It
is possible that the decisions you make while testing your
software are more important. Good software has a good testing
strategy.

Fast, cheap, good. Choose two.

When designing a testing strategy you need to conisder which
types of testing you will apply to each piece of your software. A
good strategy could have any combination of the following types
of tests.

## Manual Testing

- Developer
- Dedicated QA

## Automated Testing

- Unit Tests
- Integration Tests

## Manual Testing

The developer writing the software is responsible for ensuring
all of the code they write is tested. Code must satisfy business
requirements, issues within that code must not hinder business
requirements from being fulfilled.

In order to allow developers to focus more time on satisfying
business requirements some large companies have entire
departments of people dedicated to testing and reporting issues
within software. Smaller companies will hire 3rd party companies
that will manually test your software on a contract basis.

As a developer you allocate time to resolving issues and
submitting them back to the QA deparment for regresssion testing.
This process is generally quite good, but it is neither fast or
cheap.

## Automated Testing

Automation can improve the speed of testing in areas where
coverage is good. It is typical that the cost of developing and
maintaining tests goes up with the coverage percentage. Code
coverage is a percentage measurement that reflects the amount of
code that is tested by the projects unit tests. We use tools like
RCov ( https://github.com/relevance/rcov ) to help us track
coverage.

It is not necessary to have 100% coverage in order for a testing
strategy to be considered good. There are some parts of the
software that are not critical. It may be a better overall
strategy to assign the largest portion of the testing budget to
the checkout and ordering code. This means that some other piece
of your project may be impacted.

Some advantages of Unit Tests are:

- Specific functions and classes are tested in isolation, making
  them easy to troubleshoot.
- Can be run quickly against a code base.
- Can be run after every change to ensure no previous
  functionality is broken.
- They provide a high level of confidence that your changes did
  not introduce new bugs.
- A good set of unit tests prove that software is stable and
  reliable.

Some disadvantages of Unit Tests are:

- Writing tests takes a long time and engineers are expensive.
- Tests need to be maintained as the project continues to grow.
- It is difficult to write good tests that provide good coverage.
- Unit tests cannot test how different modules integrate with
  each other.

Integration tests suffer from a lot of the same disadvantages
that apply to unit tests. They do allow you to mimic the user
interaction with your code and ensure the different pieces fit
nicely together.

If you wanted to test that 'A user can create a new account', you
would visualize the path they go through in order to accomplish
the stated goal. They would click on the button that says sign
in, they would fill out a couple of fields and then they would be
presented with a page that displays their profile. An integration
test would be programmed to go through the same interface to
perform the same task and ensure that certain criteria is
present.

In order to replicate the user flow we use a headless browser
instance. Selenium ( http://http://docs.seleniumhq.org/ ) and
PhantomJS ( http://phantomjs.org/ ) are two popular
implementations.

---

## Continuous Integration / Continuous Delivery (Deployment)

If you have a good level of confidence with your automated tests
then your project is a good candidate for a CI/CD process.
Continuous integration describes an automated system that will
take a commit and run a set of automated integration tests
against it.

What the software does when the tests pass largely depends on the
level of confidence the developers have in the test suite. If the
confidence is high the automated process may include an automatic
deployment to the production server. In the case where the
developers are not comfortable automatically releasing code to
production they may deploy to a staging server which can be
tested manually.

If the tests do not pass then the 'build' is considered broken.
All developers are informed through email and in some cases
Slack. The person who commited the change is responsible for
reverting or fixing their code. Other than the changes necessary
to address the break there should be no more commits until the
'build' is fixed and is passing tests again. This allows for a
process where bugs are easy to track down because developers are
informed as soon as a specific commit no longer satisfies the
testing criteria.

When a bug makes it through the automated test suite and in to
production then it is important that devleopers can easily revert
changes to put production back in to a good state as quickly as
possible.

There are a number of different tools for your CI/CD process.

- Jenkins CI ( https://jenkins.io/ )
- Travis CI ( https://travis-ci.org/ )
- Circle CI ( https://circleci.com/ )
- Atlassian Bamboo ( https://www.atlassian.com/software/bamboo )
- More...

---

## RSpec and Capybara

Two libraries that will help us write and run tests are available
as open source projects. We will use RSpec as our test runner and
Capybara as an integration test framework. Capybara makes it
easier to simulate how a user interacts with an application.

Initial setup instructions can be found in Compass. Capybara and
Poltergeist Setup
( https://web-compass.lighthouselabs.ca/days/w7d2/activities/451 )
describes how to install the javascript driver, include the
necessary gems for testing and configure rails project for
testing.

Once you are able to run tests, you can generate new feature
specs with the rails command `bin/rails generate rspec:feature <feature_name>`. In this case we will generate a feature spec for
'orders'.

```rb
require 'rails_helper'

RSpec.feature "Visitor orders a product", type: :feature, js: true do

  scenario "They complete an order while logged in" do
  end

  scenario "They complete an order while not logged in" do
  end

end
```

We set the option `js: true` so that Capybara knows to use a
javascript driver.

In order to login we will need a user account. If we want to be
able to add a product to our cart we will have to create one. We
can use the `before :each` hooks to setup our test environment.

```rb
RSpec.feature "Visitor orders a product", type: :feature, js: true do
  before :each do
    @user = User.create!(
      name: 'First User',
      email: 'first@user.com',
      password: '123456',
      password_confirmation: '123456'
    )

    @category = Category.create! name: 'Apparel'
    @category.products.create!(
      name: 'Cool Shirt',
      description: 'A really cool shirt.',
      image: 'test.jpg',
      quantity: 3,
      price: 12.99
    )
  end
end
```

The first test requires us to login before completing the order.
We can also setup our expectations for the order completion page.
The requirements tell us that we need to display the users email
address after they have complete an order.

```rb
scenario "They complete an order while logged in" do
  visit '/login'

  within 'form' do
    fill_in id: 'email', with: 'first@user.com'
    fill_in id: 'password', with: '123456'

    click_button 'Submit'
  end

  expect(page).to have_content 'Thank you for your order first@user.com!'
end
```

Completing the order is the difficult part. We need to start
disecting the existing html structure to determine which elements
we need to interact with. Since we are going to be peforming the
same task for both tests we will create a function that can be
called from within either scenario.

```rb
def add_product_and_checkout
  first('article.product').find_link('Add').click

  visit '/cart'

  first('button.stripe-button-el').click

  within_frame 'stripe_checkout_app' do
    fill_in placeholder: 'Card number', with: '4242424242424242'
    fill_in placeholder: 'MM / YY', with: "01/#{Date.today.year + 1}"
    fill_in placeholder: 'CVC', with: '123'

    click_button 'Pay'
  end
end
```

Normally Capybara is pretty good at handling the async behaviour
in the web browser. This becomes trickier with the Stripe
integration. You may need to add `Capybara.default_max_wait_time = 10` to your `rails_helpers.rb` file.

The test is slightly different for when the user is not logged
in. Instead of navigating to the login page we default the user
to the index of the site.

```rb
scenario "They complete an order while not logged in" do
  visit root_path

  add_product_and_checkout

  expect(page).to have_content 'Thank you for your order!'
end
```

We need to add a call to `add_product_and_checkout` in the original
test. We can now run these two tests against our code. If there
are any issues with our implementation we can make changes to
ensure our code satisfies the test cases we have just created.

The full version of the spec for orders is available as
`orders_spec.rb` in this repo.

## References

Capybara cheat sheet ( http://cheatrags.com/capybara )

---

## Bonus

The tools we discussed today are Ruby based. If you recall from
earlier weeks there are open source projects written in
JavaScript that allow you to manage both unit and integration
tests. Two of the more popular frameowrks that go well together
are Mocha ( http://mochajs.org/ ) and Chai ( http://chaijs.com/ ) . Chai has a number of plugins ( http://chaijs.com/plugins/ ) to
help with developing tests for diverse environments.

Travis Borsa

--\_av-wIdcvXwb5M96AivVzOK9Rg
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w=
3.org/TR/REC-html40/loose.dtd">
<html><body>
<h2>Feature Testing with RSpec and Rails</h2>

<p>We started the lecture with a review of all things testing, and ended it=
 by looking at feature testing with Rails.=20
For our feature tests we used rspec + capybara + phantomJS</p>

<p>The notes below are courtesy of Karl!</p>

<p>Slides and notes are available at <a href=3D"https://mandrillapp.com/tra=
ck/click/30244704/github.com?p=3DeyJzIjoidFNpanVXTzFUbGFMZWZWcHhKQ25RMW8yMU=
tJIiwidiI6MSwicCI6IntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcX=
FwvXFxcL2dpdGh1Yi5jb21cXFwvamVuc2VuXFxcL3JzcGVjLW5vdGVzXFxcL1wiLFwiaWRcIjpc=
ImIyZDAzMGJkZjM2MzRkMWJiYTYxZTliNTYwNjI0ZmJkXCIsXCJ1cmxfaWRzXCI6W1wiNDViMWQ=
0OTJlZTJmNWM1ZDViMmJhODY0MDM4MGMwZjIxZmQxOTkyMVwiXX0ifQ" target=3D"_blank">=
https://github.com/jensen/rspec-notes/</a>. The old lecture from monday has=
 slides and notes as well <a href=3D"https://mandrillapp.com/track/click/30=
244704/github.com?p=3DeyJzIjoiQ1p0QjZHY3c4bG9EdEZycmlmaTJXU2JHNGxJIiwidiI6M=
SwicCI6IntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL2dp=
dGh1Yi5jb21cXFwvamVuc2VuXFxcL3Rlc3Rpbmctbm90ZXNcIixcImlkXCI6XCJiMmQwMzBiZGY=
zNjM0ZDFiYmE2MWU5YjU2MDYyNGZiZFwiLFwidXJsX2lkc1wiOltcImFkNjc1ODAzZDUwM2UwN2=
JhMGE4NzA2ZDMyOGJkYjA1Y2ViZjBlN2VcIl19In0" target=3D"_blank">https://github=
.com/jensen/testing-notes</a>.</p>

<h2>Strategic Testing</h2>

<p>The decisions you make while writing software are important. It is possi=
ble that the decisions you make while testing your software are more import=
ant. Good software has a good testing strategy.</p>

<p>Fast, cheap, good. Choose two.</p>

<p>When designing a testing strategy you need to conisder which types of te=
sting you will apply to each piece of your software. A good strategy could =
have any combination of the following types of tests.</p>

<h3>Manual Testing</h3>

<ul>
<li>Developer</li>
<li>Dedicated QA</li>
</ul>

<h3>Automated Testing</h3>

<ul>
<li>Unit Tests</li>
<li>Integration Tests</li>
</ul>

<h3>Manual Testing</h3>

<p>The developer writing the software is responsible for ensuring all of th=
e code they write is tested. Code must satisfy business requirements, issue=
s within that code must not hinder business requirements from being fulfill=
ed.</p>

<p>In order to allow developers to focus more time on satisfying business r=
equirements some large companies have entire departments of people dedicate=
d to testing and reporting issues within software. Smaller companies will h=
ire 3rd party companies that will manually test your software on a contract=
 basis.</p>

<p>As a developer you allocate time to resolving issues and submitting them=
 back to the QA deparment for regresssion testing. This process is generall=
y quite good, but it is neither fast or cheap.</p>

<h3>Automated Testing</h3>

<p>Automation can improve the speed of testing in areas where coverage is g=
ood. It is typical that the cost of developing and maintaining tests goes u=
p with the coverage percentage. Code coverage is a percentage measurement t=
hat reflects the amount of code that is tested by the projects unit tests. =
We use tools like <a href=3D"https://mandrillapp.com/track/click/30244704/g=
ithub.com?p=3DeyJzIjoiaVRhai1oYjQ0R3hJTzZpS1NvY2poNG01NXlrIiwidiI6MSwicCI6I=
ntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL2dpdGh1Yi5j=
b21cXFwvcmVsZXZhbmNlXFxcL3Jjb3ZcIixcImlkXCI6XCJiMmQwMzBiZGYzNjM0ZDFiYmE2MWU=
5YjU2MDYyNGZiZFwiLFwidXJsX2lkc1wiOltcIjA3ZjQ5ZjczYTM3MTQ2ZTFiNTAyZWZjYTEzZm=
YwYjA5MmYwYTk3OTZcIl19In0" target=3D"_blank">RCov</a> to help us track cove=
rage.</p>

<p>It is not necessary to have 100% coverage in order for a testing strateg=
y to be considered good. There are some parts of the software that are not =
critical. It may be a better overall strategy to assign the largest portion=
 of the testing budget to the checkout and ordering code. This means that s=
ome other piece of your project may be impacted.</p>

<p>Some advantages of Unit Tests are:</p>

<ul>
<li>Specific functions and classes are tested in isolation, making them eas=
y to troubleshoot.</li>
<li>Can be run quickly against a code base.</li>
<li>Can be run after every change to ensure no previous functionality is br=
oken.</li>
<li>They provide a high level of confidence that your changes did not intro=
duce new bugs.</li>
<li>A good set of unit tests prove that software is stable and reliable.</l=
i>
</ul>

<p>Some disadvantages of Unit Tests are:</p>

<ul>
<li>Writing tests takes a long time and engineers are expensive.</li>
<li>Tests need to be maintained as the project continues to grow.</li>
<li>It is difficult to write good tests that provide good coverage.</li>
<li>Unit tests cannot test how different modules integrate with each other.=
</li>
</ul>

<p>Integration tests suffer from a lot of the same disadvantages that apply=
 to unit tests. They do allow you to mimic the user interaction with your c=
ode and ensure the different pieces fit nicely together.</p>

<p>If you wanted to test that 'A user can create a new account', you would =
visualize the path they go through in order to accomplish the stated goal. =
They would click on the button that says sign in, they would fill out a cou=
ple of fields and then they would be presented with a page that displays th=
eir profile. An integration test would be programmed to go through the same=
 interface to perform the same task and ensure that certain criteria is pre=
sent.</p>

<p>In order to replicate the user flow we use a headless browser instance. =
<a href=3D"https://mandrillapp.com/track/click/30244704/http?p=3DeyJzIjoiR1=
hITzRORzMwY2IzdWhHTDZZNzFVQjBfbVZRIiwidiI6MSwicCI6IntcInVcIjozMDI0NDcwNCxcI=
nZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvaHR0cDpcXFwvXFxcL2RvY3Muc2VsZW5pdW1o=
cS5vcmdcXFwvXCIsXCJpZFwiOlwiYjJkMDMwYmRmMzYzNGQxYmJhNjFlOWI1NjA2MjRmYmRcIix=
cInVybF9pZHNcIjpbXCI2NjgzM2ZkMDUxNTg3NWY5NDZiYzFkMzRkZjg3YjVkYTIyNTQxZWNiXC=
JdfSJ9" target=3D"_blank">Selenium</a> and <a href=3D"https://mandrillapp.c=
om/track/click/30244704/phantomjs.org?p=3DeyJzIjoiRXhHSkRNeEtlZ3g1SlBUMFdHa=
mxLZUUwdERVIiwidiI6MSwicCI6IntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJo=
dHRwOlxcXC9cXFwvcGhhbnRvbWpzLm9yZ1xcXC9cIixcImlkXCI6XCJiMmQwMzBiZGYzNjM0ZDF=
iYmE2MWU5YjU2MDYyNGZiZFwiLFwidXJsX2lkc1wiOltcIjE5ZTRlZDE0ZGExZjgzNzU5MmRkOD=
QyODUxMDMxOTdlOTAzOWViNmJcIl19In0" target=3D"_blank">PhantomJS</a> are two =
popular implementations.</p>

<h2>Continuous Integration / Continuous Delivery (Deployment)</h2>

<p>If you have a good level of confidence with your automated tests then yo=
ur project is a good candidate for a CI/CD process. Continuous integration =
describes an automated system that will take a commit and run a set of auto=
mated integration tests against it.</p>

<p>What the software does when the tests pass largely depends on the level =
of confidence the developers have in the test suite. If the confidence is h=
igh the automated process may include an automatic deployment to the produc=
tion server. In the case where the developers are not comfortable automatic=
ally releasing code to production they may deploy to a staging server which=
 can be tested manually.</p>

<p>If the tests do not pass then the 'build' is considered broken. All deve=
lopers are informed through email and in some cases Slack. The person who c=
ommited the change is responsible for reverting or fixing their code. Other=
 than the changes necessary to address the break there should be no more co=
mmits until the 'build' is fixed and is passing tests again. This allows fo=
r a process where bugs are easy to track down because developers are inform=
ed as soon as a specific commit no longer satisfies the testing criteria.</=
p>

<p>When a bug makes it through the automated test suite and in to productio=
n then it is important that devleopers can easily revert changes to put pro=
duction back in to a good state as quickly as possible.</p>

<p>There are a number of different tools for your CI/CD process.</p>

<ul>
<li><a href=3D"https://mandrillapp.com/track/click/30244704/jenkins.io?p=3D=
eyJzIjoiNTNvdllMblBPLURFUjBBZWU3YUlYV09ZSnNnIiwidiI6MSwicCI6IntcInVcIjozMDI=
0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL2plbmtpbnMuaW9cXFwvXCIsXC=
JpZFwiOlwiYjJkMDMwYmRmMzYzNGQxYmJhNjFlOWI1NjA2MjRmYmRcIixcInVybF9pZHNcIjpbX=
CI0MGZiYzIxMTdkNWFkNThhMTFkNGZjNjdlODAzMWI3MjNhOWE4MmI0XCJdfSJ9" target=3D"=
_blank">Jenkins CI</a></li>
<li><a href=3D"https://mandrillapp.com/track/click/30244704/travis-ci.org?p=
=3DeyJzIjoidVRUSDdpQWE4elRUSHI5SEFIQzZrQ3NMdTY0IiwidiI6MSwicCI6IntcInVcIjoz=
MDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL3RyYXZpcy1jaS5vcmdcXFw=
vXCIsXCJpZFwiOlwiYjJkMDMwYmRmMzYzNGQxYmJhNjFlOWI1NjA2MjRmYmRcIixcInVybF9pZH=
NcIjpbXCJiYmNhZTc5NmMzMWM3MjMwYjE3Zjc2YjkwMjJlZTZjY2IzN2JmZTZkXCJdfSJ9" tar=
get=3D"_blank">Travis CI</a></li>
<li><a href=3D"https://mandrillapp.com/track/click/30244704/circleci.com?p=
=3DeyJzIjoiaDNVM1FtOGdxX2plUUxCZ1VXYk5xZWdHNkNRIiwidiI6MSwicCI6IntcInVcIjoz=
MDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL2NpcmNsZWNpLmNvbVxcXC9=
cIixcImlkXCI6XCJiMmQwMzBiZGYzNjM0ZDFiYmE2MWU5YjU2MDYyNGZiZFwiLFwidXJsX2lkc1=
wiOltcIjA4MjY2ODFmZDgzZTcwZGFiMGFiYjA2NTlhYWJjYWIwMTgwMWEwZDhcIl19In0" targ=
et=3D"_blank">Circle CI</a></li>
<li><a href=3D"https://mandrillapp.com/track/click/30244704/www.atlassian.c=
om?p=3DeyJzIjoiNzZyOWI4VWt3d05KOGJGckNkR295ZUxGUDdFIiwidiI6MSwicCI6IntcInVc=
IjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL3d3dy5hdGxhc3NpYW4=
uY29tXFxcL3NvZnR3YXJlXFxcL2JhbWJvb1wiLFwiaWRcIjpcImIyZDAzMGJkZjM2MzRkMWJiYT=
YxZTliNTYwNjI0ZmJkXCIsXCJ1cmxfaWRzXCI6W1wiYWQwZDlhYmEzYTdlYzAyYWJmOTRhMDM2N=
TZhOGQ0ZjZkZWNlM2Q1NVwiXX0ifQ" target=3D"_blank">Atlassian Bamboo</a></li>
<li>More...</li>
</ul>

<h2>RSpec and Capybara</h2>

<p>Two libraries that will help us write and run tests are available as ope=
n source projects. We will use RSpec as our test runner and Capybara as an =
integration test framework. Capybara makes it easier to simulate how a user=
 interacts with an application.</p>

<p>Initial setup instructions can be found in Compass. <a href=3D"https://m=
andrillapp.com/track/click/30244704/web-compass.lighthouselabs.ca?p=3DeyJzI=
joiYXgtZEIySE1HSWlzS0pPd0VyTDJuZkdRd3RBIiwidiI6MSwicCI6IntcInVcIjozMDI0NDcw=
NCxcInZcIjoxLFwidXJsXCI6XCJodHRwczpcXFwvXFxcL3dlYi1jb21wYXNzLmxpZ2h0aG91c2V=
sYWJzLmNhXFxcL2RheXNcXFwvdzdkMlxcXC9hY3Rpdml0aWVzXFxcLzQ1MVwiLFwiaWRcIjpcIm=
IyZDAzMGJkZjM2MzRkMWJiYTYxZTliNTYwNjI0ZmJkXCIsXCJ1cmxfaWRzXCI6W1wiZThjZGYzN=
zg1ZjAxMDg3ZTJmYzIzZGFiY2VlMzcyNDNmYTBkNGY4ZFwiXX0ifQ" target=3D"_blank">Ca=
pybara and Poltergeist Setup</a> describes how to install the javascript dr=
iver, include the necessary gems for testing and configure rails project fo=
r testing.</p>

<p>Once you are able to run tests, you can generate new feature specs with =
the rails command <code>bin/rails generate rspec:feature &lt;feature_name&g=
t;</code>. In this case we will generate a feature spec for 'orders'.</p>
<pre><code class=3D"language-ruby allow-select">require 'rails_helper'

RSpec.feature "Visitor orders a product", type: :feature, js: true do

scenario "They complete an order while logged in" do
end

scenario "They complete an order while not logged in" do
end

end
</code></pre>

<blockquote>
<p>We set the option <code>js: true</code> so that Capybara knows to use a =
javascript driver.</p>
</blockquote>
<p>In order to login we will need a user account. If we want to be able to =
add a product to our cart we will have to create one. We can use the <code>=
before :each</code> hooks to setup our test environment.</p>
<pre><code class=3D"language-ruby allow-select">RSpec.feature "Visitor orde=
rs a product", type: :feature, js: true do
  before :each do
    @user =3D User.create!(
      name: 'First User',
      email: 'first@user.com',
      password: '123456',
      password_confirmation: '123456'
    )

    @category =3D Category.create! name: 'Apparel'
    @category.products.create!(
      name: 'Cool Shirt',
      description: 'A really cool shirt.',
      image: 'test.jpg',
      quantity: 3,
      price: 12.99
    )

end
end
</code></pre>

<p>The first test requires us to login before completing the order. We can =
also setup our expectations for the order completion page. The requirements=
 tell us that we need to display the users email address after they have co=
mplete an order.</p>
<pre><code class=3D"language-ruby allow-select">scenario "They complete an =
order while logged in" do
  visit '/login'

within 'form' do
fill_in id: 'email', with: 'first@user.com'
fill_in id: 'password', with: '123456'

    click_button 'Submit'

end

expect(page).to have_content 'Thank you for your order first@user.com!'
end
</code></pre>

<p>Completing the order is the difficult part. We need to start disecting t=
he existing html structure to determine which elements we need to interact =
with. Since we are going to be peforming the same task for both tests we wi=
ll create a function that can be called from within either scenario.</p>
<pre><code class=3D"language-ruby allow-select">def add_product_and_checkou=
t
  first('article.product').find_link('Add').click

visit '/cart'

first('button.stripe-button-el').click

within_frame 'stripe_checkout_app' do
fill_in placeholder: 'Card number', with: '4242424242424242'
fill_in placeholder: 'MM / YY', with: "01/#{Date.today.year + 1}"
fill_in placeholder: 'CVC', with: '123'

    click_button 'Pay'

end
end
</code></pre>

<blockquote>
<p>Normally Capybara is pretty good at handling the async behaviour in the =
web browser. This becomes trickier with the Stripe integration. You may nee=
d to add <code>Capybara.default_max_wait_time =3D 10</code> to your <code>r=
ails_helpers.rb</code> file.</p>
</blockquote>
<p>The test is slightly different for when the user is not logged in. Inste=
ad of navigating to the login page we default the user to the index of the =
site.</p>
<pre><code class=3D"language-ruby allow-select">scenario "They complete an =
order while not logged in" do
  visit root_path

add_product_and_checkout

expect(page).to have_content 'Thank you for your order!'
end
</code></pre>

<p>We need to add a call to <code>add_product_and_checkout</code> in the or=
iginal test. We can now run these two tests against our code. If there are =
any issues with our implementation we can make changes to ensure our code s=
atisfies the test cases we have just created.</p>
<blockquote>
<p>The full version of the spec for orders is available as <code>orders_spe=
c.rb</code> in this repo.</p>
</blockquote>
<h3>References</h3>

<p>Capybara <a href=3D"https://mandrillapp.com/track/click/30244704/cheatra=
gs.com?p=3DeyJzIjoiOUFNb2tZVlVfRU5vWDdLSHlacVRvMndmMExvIiwidiI6MSwicCI6Intc=
InVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvY2hlYXRyYWdzLmN=
vbVxcXC9jYXB5YmFyYVwiLFwiaWRcIjpcImIyZDAzMGJkZjM2MzRkMWJiYTYxZTliNTYwNjI0Zm=
JkXCIsXCJ1cmxfaWRzXCI6W1wiMGJhMTYyZTEwNjdmZGFlMmQzYjYzNWJjZmFkMTgzOWYxY2QwM=
zBjMlwiXX0ifQ" target=3D"_blank">cheat sheet</a></p>

<h2>Bonus</h2>

<p>The tools we discussed today are Ruby based. If you recall from earlier =
weeks there are open source projects written in JavaScript that allow you t=
o manage both unit and integration tests. Two of the more popular frameowrk=
s that go well together are <a href=3D"https://mandrillapp.com/track/click/=
30244704/mochajs.org?p=3DeyJzIjoiTTZhd3FyazNDQzdacU91WXNyekV5N2Q1NXRzIiwidi=
I6MSwicCI6IntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvb=
W9jaGFqcy5vcmdcXFwvXCIsXCJpZFwiOlwiYjJkMDMwYmRmMzYzNGQxYmJhNjFlOWI1NjA2MjRm=
YmRcIixcInVybF9pZHNcIjpbXCIxYzQyMDkzMDNmODdhY2Q1YzFmMjNjNTMzOTM1ZmNjYWJkMjY=
3NzJiXCJdfSJ9" target=3D"_blank">Mocha</a> and <a href=3D"https://mandrilla=
pp.com/track/click/30244704/chaijs.com?p=3DeyJzIjoicHN1WkNULUQxTDFOREdUM3Bw=
WTFwSFpvaGs0IiwidiI6MSwicCI6IntcInVcIjozMDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJ=
odHRwOlxcXC9cXFwvY2hhaWpzLmNvbVxcXC9cIixcImlkXCI6XCJiMmQwMzBiZGYzNjM0ZDFiYm=
E2MWU5YjU2MDYyNGZiZFwiLFwidXJsX2lkc1wiOltcImZjNDZkYzc3YTc1NThkZDE1Y2ZiZjU5Z=
jI5NDYwZDA0NmQwNTg4OTJcIl19In0" target=3D"_blank">Chai</a>. Chai has a numb=
er of <a href=3D"https://mandrillapp.com/track/click/30244704/chaijs.com?p=
=3DeyJzIjoiNklmMmJtMWdYd0I0SWo4OUpyRmI0dk9sTFZjIiwidiI6MSwicCI6IntcInVcIjoz=
MDI0NDcwNCxcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvY2hhaWpzLmNvbVxcXC9wbHV=
naW5zXFxcL1wiLFwiaWRcIjpcImIyZDAzMGJkZjM2MzRkMWJiYTYxZTliNTYwNjI0ZmJkXCIsXC=
J1cmxfaWRzXCI6W1wiMWZkZmI3MmQ0NjFlM2IzMzAxNTI2NzI2MDA3OGQ3NzczYjg1ZDdjZlwiX=
X0ifQ" target=3D"_blank">plugins</a> to help with developing tests for dive=
rse environments.</p>

<hr>

<p>
  Travis Borsa
</p>
<img src=3D"https://mandrillapp.com/track/open.php?u=3D30244704&id=3Db2d030=
bdf3634d1bba61e9b560624fbd" height=3D"1" width=3D"1"></body></html>

--\_av-wIdcvXwb5M96AivVzOK9Rg--

<template>
  <article>
    <p>
      OTTO is a device-agnostic application for connecting patients to providers
      for video consultations—helping patients save time and money by avoiding
      waiting rooms altogether. Telehealth is a popular industry and there are a
      lot of applications which perform similar functions; what makes OTTO
      unique is the ability to offer secondary features to practices like
      scheduling and other practice administration tools. OTTO’s key selling
      point is the ability to offer consultations to practices as a continuation
      of care they’re already offering in their clinics.
    </p>
    <p>
      I was brought onto the OTTO team to help them get to a 2.0 release of the
      application which focused on improving the design and underlying front-end
      code. I touched all parts of the application including brand-alignment,
      improving user experiences and helping unify the user interface. I was
      also part of a team of developers working on the front-end. My core
      contributions included developing the CSS for the application and creating
      a large portion of the React components and views.
    </p>
    <section class="Project__content--separator">
      <h2>Logo and Brand Development</h2>
      <hr />
    </section>
    <p>
      The overall approach I took to the brand-alignment was to focus on what
      was working and to smooth out the edges. I wanted to bring a human touch
      to an austere industry focusing on an easy-to-use UI that had personality.
      The two primary typefaces I chose for the project were
      <a
        href="https://fonts.google.com/specimen/Source+Sans+Pro"
        target="_blank"
        rel="noopener"
        >Source Sans Pro</a
      >
      and
      <a
        href="https://fonts.google.com/specimen/Nunito"
        target="_blank"
        rel="noopener"
        >Nunito</a
      >—a lovely rounded sans-serif that added a nice disposition to the brand.
    </p>
    <p>
      The re-working of the logotype focused on the geometry of the letterforms
      and added roundness to the edges—which disappear nicely at small sizes.
      The iOS app icon keeps things simple transforming the ‘O’ in OTTO into a
      container for a secondary brand element—a smooth gradient blend of the two
      primary highlight colors.
    </p>
    <figure>
      <Freeform
        alt="OTTO logotypes"
        img="/img/projects/otto/otto-logo.svg"
        :height="136"
        :width="784"
      />
      <figcaption>
        <p>
          <em> Primary and secondary logotypes.</em>
        </p>
      </figcaption>
    </figure>
    <figure>
      <Freeform
        alt="OTTO iOS app icon"
        img="/img/projects/otto/otto-app-icon.svg"
        :height="160"
        :width="160"
      />
      <figcaption>
        <p>
          <em>
            iOS app icon introducing a gradient treatment of the two primary
            highlight brand colors.</em
          >
        </p>
      </figcaption>
    </figure>
    <p>
      Color became a priority in the application to help differentiate key
      action-based UI elements. I came up with a broad palette to handle
      multiple scenarios and to offer good differentiation of information on
      elements like calendars. Additionally, the two colors associated with the
      original brand—orange and purple—were updated to feel consistent with
      other color additions.
    </p>
    <figure>
      <Freeform
        alt="OTTO color palette"
        img="/img/projects/otto/otto-colors.svg"
        :height="440"
        :width="960"
      />
      <figcaption>
        <p>
          <em>
            While a majority of the interface in the application is white and
            gray, color plays a big role with action-based UI elements. It was
            important for any secondary colors to feel as warm and natural as
            the selection of typefaces.</em
          >
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Icon System</h2>
      <hr />
    </section>
    <p>
      One of my favorite aspects of UI design is coming up with branded icon
      sets. For OTTO’s set I focused on bold shapes with the borrowed roundness
      of the logotype. All icons were designed at a base size of 32px making
      scaling to relative sizes easy within the application.
    </p>
    <figure class="full">
      <Freeform
        alt="OTTO app icon system"
        img="/img/projects/otto/otto-icons.svg"
        :height="334"
        :width="1280"
      />
      <figcaption>
        <p>
          <em>
            OTTO’s icon system borrows from the softness of the logotype and
            general clarity of form—even at small sizes.</em
          >
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Application</h2>
      <hr />
    </section>
    <p>
      One of the first tasks I undertook when reviewing the original application
      was to conduct a UI inventory and walk through each user flow—looking for
      inconsistencies in how common tasks were completed and reducing as many
      unnecessary views as possible. We have four distinct user types—patient,
      provider, practice and superuser—with a few key areas of the application
      overlapping.
    </p>
    <p>
      A majority of the users would be engaging with the application via an iOS
      application so it made a lot of sense to focus on mobile-first user
      patterns when redesigning the application. I borrowed a lot of aspects
      from the iOS vernacular. Elements were scaled to be easy for aging users
      to use and the contrast ratio of UI elements and typography within the
      application were considered accordingly.
    </p>
    <p>
      The most common tasks within the application include finding new
      providers, making appointments, conducting consultations and scheduling
      providers and patients. A large majority of the application involves
      interacting with various form elements to query results—it was paramount
      that we saved users as much time as possible. A good example of the type
      of patterns designed include smart inputs that narrow search results when
      users start typing, segmented controllers instead of radio buttons and
      selects, as well as contextual navigation to present secondary options for
      various elements.
    </p>
    <figure class="full">
      <section class="multi">
        <Phone
          alt="Find a provider 1"
          img="https://images.ctfassets.net/cuehicrlqnvu/1vxZk9K8oR8nrg8vHHTyb9/07eceb8d4079394d9f55aba8e800f838/otto-find-provider-1.jpg"
        />
        <Phone
          alt="Find a provider 2"
          img="https://images.ctfassets.net/cuehicrlqnvu/1r7MAt8oTR3qhZFpmISrI7/4cf86fd58b3c200cf76c1491eacf8f83/otto-find-provider-2.jpg"
        />
        <Phone
          alt="Find a provider 3"
          img="https://images.ctfassets.net/cuehicrlqnvu/10RrFIra0boM2cUlKTunpx/257e976faf3fac87110aa89cad33c0df/otto-find-provider-3.jpg"
        />
      </section>
      <figcaption>
        <p>
          <em>
            For first-time users we reduced a lot of the friction of finding a
            new provider by helping narrow the search query and showing
            providers who are available soonest with the next available
            appointment.</em
          >
        </p>
      </figcaption>
    </figure>
    <figure class="full">
      <Browser
        alt="Find a provider - Care Team"
        img="https://images.ctfassets.net/cuehicrlqnvu/2wqVe9jEUjOoVpNXHURIKd/b70008bc8ab67b1b265a05518e110153/otto-find-provider-care-team.jpg"
      />
      <figcaption>
        <p>
          <em>
            For users who like seeing the same providers consistently, we
            grouped saved providers into a Care Team—enabling a broader amount
            of appointment availability.</em
          >
        </p>
      </figcaption>
    </figure>
    <figure class="full">
      <section class="multi">
        <Phone
          alt="Provider profile"
          img="https://images.ctfassets.net/cuehicrlqnvu/121LiTky8iZwaTHVTSjuCP/f61439ba4d1c49d3fcec9a5f2bf21d7e/otto-provider-profile.jpg"
        />
        <Phone
          alt="Upcoming appointments"
          img="https://images.ctfassets.net/cuehicrlqnvu/2Y47rz9ZqGec2WC8EBrelU/c4f43369e88c525554458338c0416922/otto-appointments-upcoming.jpg"
        />
        <Phone
          alt="Cancel appointment"
          img="https://images.ctfassets.net/cuehicrlqnvu/7zYan2TpsjhfEyTlkcPNFp/683e76e71419cdb08604fb3c3fcc5db8/otto-cancel-appointment.jpg"
        />
      </section>
      <figcaption>
        <p>
          <em>
            If users want to learn more about providers they can view their
            profiles. Additionally it’s easy to view upcoming appointments and
            reschedule or cancel an appointment.</em
          >
        </p>
      </figcaption>
    </figure>
    <figure class="full">
      <Browser
        alt="Provider consultation"
        img="https://images.ctfassets.net/cuehicrlqnvu/1BFQMzavofsnYhOUfOARx3/7708a3a17f6bbb7c97c06a18a56c6506/otto-consultation-provider.jpg"
      />
      <figcaption>
        <p>
          <em>
            The core of the application is the one-to-one connection providers
            and patients make through video consultations. On the provider end
            of the call information about patients as well as an ability to take
            notes during the consultation are available. Notes integrate with
            external EMR systems making OTTO versatile within existing
            healthcare environments.</em
          >
        </p>
      </figcaption>
    </figure>
    <figure class="full">
      <Browser
        alt="Practice scheduling"
        img="https://images.ctfassets.net/cuehicrlqnvu/7enaMbrbK3QtUXe0ApGv9Q/98263aa914a102887611d2ed465a45ed/otto-schedule-practice.jpg"
      />
      <figcaption>
        <p>
          <em
            >For busy practices scheduling multiple providers for consultations
            is easy. Having an overview of the upcoming week is very
            helpful.</em
          >
        </p>
      </figcaption>
    </figure>
    <figure class="full">
      <section class="multi">
        <Phone
          alt="Schedule add"
          img="https://images.ctfassets.net/cuehicrlqnvu/5DZDLXVukPWlYUlzK3ug08/b0a1c57096d0a09f9d8ec4e559525ae4/otto-schedule-add.jpg"
        />
        <Phone
          alt="Schedule edit"
          img="https://images.ctfassets.net/cuehicrlqnvu/7HO0YHFSaoZKknYe9hAFGE/fc6d4a71e0485528b236bc358497ff5f/otto-schedule-edit.jpg"
        />
        <Phone
          alt="Schedule new patients"
          img="https://images.ctfassets.net/cuehicrlqnvu/4g0HtrQQwgTCzAP6h4T1BF/e35bff52e145ca6e9b343b310d28fc77/otto-new-patient.jpg"
        />
      </section>
      <figcaption>
        <p>
          <em>
            Practice administrators can add or edit provider availability as
            well as schedule new patients.</em
          >
        </p>
      </figcaption>
    </figure>
    <section class="Project__content--separator">
      <h2>Development</h2>
      <hr />
    </section>
    <p>
      I played a pivotal role in the development of the application. I was a
      member of a small team of developers focusing on completely rewriting the
      front-end code for the application. We chose React as a framework and I
      loved having an opportunity to get my hands dirty with the technology. I
      found a lot of overlap between React and Jekyll so building out components
      ended up being a breeze.
    </p>
    <p>
      I was responsible for writing all of the CSS for the application and
      because I had created the design system I wrote a majority of the
      components used. I was also responsible for writing a large portion of the
      views and assisted with API integration prior to launch.
    </p>
  </article>
</template>
<script>
import Browser from "@/components/DeviceBrowser";
import Freeform from "@/components/DeviceFreeform";
import Phone from "@/components/DevicePhone";
export default {
  components: { Browser, Freeform, Phone },
};
</script>

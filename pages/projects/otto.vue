<template lang="md">
OTTO is a device-agnostic application for connecting patients to providers for video consultations—helping patients save time and money by avoiding waiting rooms altogether. Telehealth is a popular industry and there are a lot of applications which perform similar functions; what makes OTTO unique is the ability to offer secondary features to practices like scheduling and other practice administration tools. OTTO’s key selling point is the ability to offer consultations to practices as a continuation of care they’re already offering in their clinics.

I was brought onto the OTTO team to help them get to a 2.0 release of the application which focused on improving the design and underlying front-end code. I touched all parts of the application including brand-alignment, improving user experiences and helping unify the user interface. I was also part of a team of developers working on the front-end. My core contributions included developing the CSS for the application and creating a large portion of the React components and views.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/7452o2aWMSXGYXK2ZJyUah/1dc689e5f80609b86531a5e8032244ed/otto-1-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/2MERhIhAeYJFcHHVzCi1JB/2ea5019bd8e1bbdb067ca85bb7c18942/otto-1-dark.svg', title: 'OTTO Health logotype and icons'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/5UMp0gplhHLep3UT8m3Bdd/e41d9f191ebaac4c80b4d4a440308224/otto-2-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/4or0Tr4uStyZu4UKGsNJgQ/8b50b2f39254f5fa3b7003fa8664ce36/otto-2-dark.svg', title: 'Additional UI elements'}]" caption="Logotype, brand icons and examples of the UI"/>

### Logo and Brand Development
***

The overall approach I took to the brand-alignment was to focus on what was working and to smooth out the edges. I wanted to bring a human touch to an austere industry focusing on an easy-to-use UI that had personality. The two primary typefaces I chose for the project were Source Sans Pro and Nunito—a lovely rounded sans-serif that added a nice disposition to the brand.

The re-working of the logotype focused on the geometry of the letterforms and added roundness to the edges—which disappear nicely at small sizes.

Color became a priority in the application to help differentiate key action-based UI elements. I came up with a broad palette to handle multiple scenarios and to offer good differentiation of information on elements like calendars. Additionally, the two colors associated with the original brand—orange and purple—were updated to feel consistent with other color additions.

One of my favorite aspects of UI design is coming up with branded icon sets. For OTTO’s set I focused on bold shapes with the borrowed roundness of the logotype. All icons were designed at a base size of 32px making scaling to relative sizes easy within the application.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/3papMlAEGcgcOKC5S32k2g/ca1600ff22ccc573603ce688e69231b8/otto-3-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/5vWZJuxI7bBMtTsG9s429Y/3ca0e5d0d4b6ab9a8d0d4105cef52fce/otto-3-dark.svg', title: 'Patient call UI'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/e3RCPYmsiH1ZvvV524mgL/559cbb18f161813aab6dabbee1d82507/otto-4-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/3eC9mUJ9Tb9oj8sMoDSpS9/c51e6bb0f09c198fc1187119667a4205/otto-4-dark.svg', title: 'Provider call UI'}]" caption="Main interface for connecting patients with providers"/>

### Application
***

One of the first tasks I undertook when reviewing the original application was to conduct a UI inventory and walk through each user flow—looking for inconsistencies in how common tasks were completed and reducing as many unnecessary views as possible. We have four distinct user types—patient, provider, practice and superuser—with a few key areas of the application overlapping.

A majority of the users would be engaging with the application via an iOS application so it made a lot of sense to focus on mobile-first user patterns when redesigning the application. I borrowed a lot of aspects from the iOS vernacular. Elements were scaled to be easy for aging users to use and the contrast ratio of UI elements and typography within the application were considered accordingly.

The most common tasks within the application include finding new providers, making appointments, conducting consultations and scheduling providers and patients. A large majority of the application involves interacting with various form elements to query results—it was paramount that we saved users as much time as possible. A good example of the type of patterns designed include smart inputs that narrow search results when users start typing, segmented controllers instead of radio buttons and selects, as well as contextual navigation to present secondary options for various elements.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/4wKHTQzR7IQOMdy2hccu02/3509ce0e282d93e4c1c372933a0ea2b9/otto-5-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/1piGKgYxalnuogVQd26tKQ/3dddf7235a8e22e71b37df655703aa2a/otto-5-dark.svg', title: 'Appointment creation UI'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/g10b1uIUelwoSK6OgccO1/b8136d09490d671c309bf12d6f46e62c/otto-6-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/3YRCt1TQ6HXKqT9GiGIyDw/76aef73446a54041b7684ba714c179fb/otto-6-dark.svg', title: 'Practice UI including scheduling'}]" caption="Appointment creation UI and elements for practice-level administration including scheduling and patient data charts"/>

### Development
***

I played a pivotal role in the development of the application. I was a member of a small team of developers focusing on completely rewriting the front-end code for the application. We chose React as a framework and I loved having an opportunity to get my hands dirty with the technology. I found a lot of overlap between React and Jekyll so building out components ended up being a breeze.

I was responsible for writing all of the CSS for the application and because I had created the design system I wrote a majority of the components used. I was also responsible for writing a large portion of the views and assisted with API integration prior to launch.
</template>
<script>
export default {
  name: "OTTOHealth",
};
</script>

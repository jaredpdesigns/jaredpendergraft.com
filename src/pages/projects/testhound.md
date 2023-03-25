---
layout: page-project.webc
pageClass: detail
imgBlock1:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/48vXjpT9HHgsgDZQXR3hjo/31a77d3d234ca057b688f0bad18fe87d/th-1.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/5KFJuzeMt6nfDL0lBW7f12/54c75c7fa2015ffb5de8b4899cada7e3/th-1-dark.svg",
      title: "Logo revamp & color palette",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1hj6eyu7imRgd6AkHRHofI/b35d38e7ccca4af69c7a081f5e0ac053/th-2.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/FnHK0WHYy8SlFxhau3cZE/8c8932d17153c0aa79319e2857698054/th-2-dark.svg",
      title: "Accommodation mapping interface",
    },
  ]
imgBlock2:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/6CLTjQb1ovJ5oZuAKhvB0Z/595e6c5f22d2bd24d8da248186b94639/th-3.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/5VBb2ENCojYmb46pLxnr88/4fc8ad02817e67dd76a9f19d6ecc2081/th-3-dark.svg",
      title: "Global system updates",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/6nv5qeG2t3nFc19zPXRhAc/9eff3c1f6823a918f453c47786bbcace/th-4.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/6JKq3CybZPHZYgfE7IZTq0/774fe331c18f4c69c2be1ed6082add3d/th-4-dark.svg",
      title: "Student profile details",
    },
  ]
imgBlock3:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1jd9BAzUtZ22STmFvkb8s7/658a66db8fadaf511719d550d1dd1028/th-5.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/56qsEPgryQlwU9n123yEGq/c5ffb761a88bfad880acad75d4d8af31/th-5-dark.svg",
      title: "Student profile accommodations",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/7jQcWf8TFl1AaOHdIFEoGV/604890e085046f56dfb491658ae50f6a/th-6.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3e8qaF7PxMJB40eClSKN56/0d4a5fddcdc264a96ca96de7ec48aeec/th-6-dark.svg",
      title: "Schedule configuration",
    },
  ]
imgBlock4:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/23pQ0exV0bNzRwpnBLzALn/4067335fbd93ca6adb5d968695836678/th-7.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/4v5gFbEhlRvcMzhlQI7qGs/3ac785c019c9cc005189e53fe07b9eb1/th-7-dark.svg",
      title: "Test filtering",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/5C3xn19zdDiT72hUUXxaCz/572c0a8bbb52e1ae5e81256d29150401/th-8.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/Zy4nTN4WFDKTMfLUOsgQW/f7c9f45e21dbf01c109639f31c62db61/th-8-dark.svg",
      title: "Student selection inside a test",
    },
  ]
imgBlock5:
  [
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/6hcZrkcwQbCwzVlzleOwFX/7b58f086698521e90809dadcae79c752/th-9.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3qVq1sgpAkCbcHzsv5rYg/3fe7122e0c01897a66378a4b204fff3f/th-9-dark.svg",
      title: "Test materials management",
    },
    {
      img: "https://images.ctfassets.net/cuehicrlqnvu/1qo3pTiNFbWzeFcxnu8c4g/1fe27074242195fb4f4e554773e9e4e1/th-10.svg",
      imgDark: "https://images.ctfassets.net/cuehicrlqnvu/3ryl4Vs0BjrwxiMq666Bna/b7d7b7946c20203df2feb3231daa97ee/th-10-dark.svg",
      title: "Test reports administration",
    },
  ]
eleventyComputed:
  title: "{{ (projects | filteredProject('TestHound')).name }} • Jared Pendergraft"
  description: "{{ (projects | filteredProject('TestHound')).description }}"
  project:
    name: "{{ (projects | filteredProject('TestHound')).name }}"
    img: "{{ (projects | filteredProject('TestHound')).img }}?h=630&w=1200&fit=fill&f=face"
    external: "{{ (projects | filteredProject('TestHound')).external }}"
    role: "{{ (projects | filteredProject('TestHound')).role }}"
    style: "--brand: {{ (projects | filteredProject('TestHound')).hue }}"
---

## Growing Up

TestHound as a product has matured a lot in the last 10 years. As testing in schools has changed, TestHound has grown it’s offering of toolkits to support schools, and offers best-in-class reliability for scheduling students. Our mascot also deserved love and attention, and as part of an overall brand alignment between products within Education Advanced, we helped define the core characteristics of the brand.

With a bright color palette supported by a humanist primary brand typeface, TestHound makes test administration fun—users feel confident in the work they do, and enjoy the process. Keeping things light and friendly is a great approach to making the tedious process of scheduling students into tests an enjoyable experience.

<project-detail-image-wrap :images="this.imgBlock1" webc:nokeep></project-detail-image-wrap>

> Logo branding alignment and example of users being able to map external accommodations to local definitions

One of the toolkits we offer is called _Auto Pilot_—it’s primary function is to allow users to map external subjects and accommodations to a narrower set of user-defined values. This process can be time-consuming, the interface optimizes this process by relying on multi-select components as often as possible—users simply click away values they don’t want, and can use type-ahead features to narrow results from a larger set of values.

<project-detail-image-wrap :images="this.imgBlock2" webc:nokeep></project-detail-image-wrap>

> Example of school-wide updates that need attention and a student profile

## Updates & Insights

TestHound synchronizes much of its data from external feed files provided by various Student Information Systems. When users first sign-in to the application they are presented with up-to-date changes they can review and approve, or modify if incorrect. These data changes can affect which types of tests students are put into, and are very important to be accurate. Student records can often be incorrect, and it’s important for users to be able to modify records if necessary.

<project-detail-image-wrap :images="this.imgBlock3" webc:nokeep></project-detail-image-wrap>

> Manual student accommodation addition and test schedule configuration

## Define & Schedule

After pulling in data from the feed files, students’ details should be correct, but sometimes manual entry is necessary to make sure students get the accommodations they need to test successfully. Manual entries are flagged as such and easily removable when feeds catch-up.

After all the student data looks correct, it’s time to build our first test. The first part of defining a test is the “where” and “when”—once a user defines the schedule, it’s easy to move into the most important step—building the test.

<project-detail-image-wrap :images="this.imgBlock4" webc:nokeep></project-detail-image-wrap>

> Test filtering interface and student management within a test

## Filter & Refine

The best way to schedule students into tests is to do so in groups—an advanced filter menu allows users to refine the group they wish to place, and limits too much manual selection—if you know the accommodation or past performance data, you can quickly put students where they belong.

When you do need more granular control, you can select specific students and place them into a room, mark them absent or even remove them from the test altogether. Student data is also readily available inside a test for easy reference—need to know the specific accommodations a student has, simply click on their name to review at a glance.

<project-detail-image-wrap :images="this.imgBlock5" webc:nokeep></project-detail-image-wrap>

> Post-test materials management and report generation

## It’s Time to Go Home

After testing is complete, many schools (using physical test booklets) need to collect all the appropriate materials and “box” them in the proper fashion for distribution to test-graders. Users exhale in relief when they get all green checkmarks, because they know they can finally “go home” for the day because everything has been sorted properly.

Because there are so many data points inside TestHound, generating reports for school administrators is easy—configure the settings, and you can get customized reports. Being able to share this data among key stakeholders proves year after year that with TestHound, your school will have a successful testing season.

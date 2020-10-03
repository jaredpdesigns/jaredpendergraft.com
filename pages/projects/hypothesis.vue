<template lang="md">
Hypothesis is a primarily experienced through a Google Chrome extension which allows users to select text on the web, and highlight or annotate that selection. Through one of these actions the selected text is saved automatically to a user’s account and they can easily share them through social media.

Users can also interact with other users’s annotations and form a conversation about important text excerpts. Hypothesis is used throughout educational institutions and research groups—you can even use it for your favorite quotes from articles that you don’t want to forget about.

## Realign Not Redesign
***

I was hired to help Hypothesis organize and clarify the design of their application. The application had been relying on a lot of open-source icons and had upwards of 12 shades of gray used throughout the interface UI. There were also many user flows that needed some tightening up.

I’m a big fan of figuring out what’s working well with a design and amplifying those elements. There were a few examples in the icons that emphasized the personality of the application so I took that approach to creating the new set.

In addition, I helped slim down the quantity of grays used throughout the application and found a cool-gray tint that worked well for light and dark themes and helped the core brand red stand out.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/1j1KcBV2yn4ZiUzJY0oRit/269bdde9967579dda9adffcea58485e9/hypothesis-1-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/XvrIwRwUZi8U6IH1GxX18/024f581b438f89e40182e188798112e7/hypothesis-1-dark.svg', title: 'Hypothicons icon set'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/RUNxVZaK5lb9uQfebmORL/2e1e0e28b8efd520e73159d26e3aab29/hypothesis-2-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/2L0dcNSRPprQlybFxTjkKV/457518569f9fd4ec17b088bbec44852d/hypothesis-2-dark.svg', title: 'Color palette and main UI'}]" caption="Custom icon set, color palette and main UI for the tool"/>

## Annotations
***

In addition to seeing annotations in the browser extension, annotations are also available through a web application that groups them by article—so you can see all annotations that users throughout the system have made on a particular article.

Search within the application allows users to sort by multiple parameters, including user and popular tags—making sure users can find exactly the annotation they are looking for.

A new feature I helped design was group management. Users can be part of multiple groups—essentially buckets they put annotations into. It was important to allow for users to manage their groups through the extension and provide easy access to seeing all annotations in a particular group.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/4FNLPRtN2YQlJP8rmJEwxg/3bf21fc5f4727c3dfb172563ad23a295/hypothesis-3-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/2AcOAJHHCvPQn0qvmPvnTZ/bb3a98c3b5a4ab0d1ac5ecd5104789a5/hypothesis-3-dark.svg', title: 'Annotations on the web'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/4JnZXRX4xEa5HLgpnIVZm2/31a4d454265705f1ba326a5c02d86bba/hypothesis-4-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/2vdErfXcsgKbVqiMznXzp4/4ce015dfc6a26d85a58e14f2c3cb06d4/hypothesis-4-dark.svg', title: 'Additional UI including search and group management'}]" caption="Examples of how annotations appear on the web, searching using search parameters, and managing groups within the tool"/>

## Further Refinements
***

There were a lot of other areas in the UI that needed clarity, including the share dialog and how users get help when they’re having trouble with the tool.

Additional annotation states were improved including making it clearer when users were editing their annotation comments. Nested replies within annotations were also more clearly emphasized—enveloping them within the core frame of the primary annotation.

<ProjectImgWrap :images="[{ img: 'https://images.ctfassets.net/cuehicrlqnvu/5yyv7PaUvq7oEJCaLEnRZM/a93409db1f6e896f03eb709cc4d441bc/hypothesis-5-light.svg', imgDark: 'https://images.ctfassets.net/cuehicrlqnvu/7egVbKt234cMMeMponsIPp/d35e6207863663a576b40c954733e768/hypothesis-5-dark.svg', title: 'Share and help dialog boxes'},{ img: 'https://images.ctfassets.net/cuehicrlqnvu/2Quc5oEmTGCXVWBFyJPbIg/fcb59aed6585990d5e7414d71bc34041/hypothesis-6-light.svg', imgDark:'https://images.ctfassets.net/cuehicrlqnvu/4FVMO7ESJ6q0uAiHUDYoSj/503a0c99ab7581e441ddcc5ca8305302/hypothesis-6-dark.svg', title: 'Additional annotation states'}]" caption="Additional UI element including additional annotation states—editing and nested replies"/>

</template>
<script>
export default {
  name: "Hypothesis",
};
</script>

module.exports = function(name, size = 16) {
  const icons = [
    {
      name: "add",
      path: "M8,0 C9.1045695,0 10,0.8954305 10,2 L10,5.999 L14,6 C15.1045695,6 16,6.8954305 16,8 C16,9.1045695 15.1045695,10 14,10 L10,10 L10,14 C10,15.1045695 9.1045695,16 8,16 C6.8954305,16 6,15.1045695 6,14 L6,10 L2,10 C0.8954305,10 0,9.1045695 0,8 C0,6.8954305 0.8954305,6 2,6 L6,6 L6,2 C6,0.8954305 6.8954305,0 8,0 Z",
    },
    {
      name: "arrow-left",
      path: "M3.083 7h11.919a1 1 0 1 1 0 2H3.082l2.7 3.375a1 1 0 1 1-1.561 1.25L.233 8.64a.982.982 0 0 1-.089-1.155c.03-.05.065-.098.103-.142L4.22 2.375a1 1 0 0 1 1.562 1.25L3.083 7z",
    },
    {
      name: "arrow-right",
      path: "M12.92 7l-2.7-3.375a1 1 0 1 1 1.56-1.25l3.975 4.968a1.019 1.019 0 0 1 .2.357.982.982 0 0 1-.187.94l-3.987 4.985a1 1 0 1 1-1.562-1.25L12.92 9H1a1 1 0 1 1 0-2h11.92z",
    },
    {
      name: "contrast",
      path: "M8 0a8 8 0 110 16A8 8 0 018 0zm0 2v12A6 6 0 108 2z",
    },
    {
      name: "cancel",
      path: "M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M5.61289944,4.20970461 C5.22060824,3.90467972 4.65337718,3.93240926 4.29289322,4.29289322 C3.93240926,4.65337718 3.90467972,5.22060824 4.20970461,5.61289944 L4.29289322,5.70710678 L6.585,8 L4.29289322,10.2928932 L4.20970461,10.3871006 C3.90467972,10.7793918 3.93240926,11.3466228 4.29289322,11.7071068 C4.65337718,12.0675907 5.22060824,12.0953203 5.61289944,11.7902954 L5.70710678,11.7071068 L8,9.415 L10.2928932,11.7071068 L10.3871006,11.7902954 C10.7793918,12.0953203 11.3466228,12.0675907 11.7071068,11.7071068 C12.0675907,11.3466228 12.0953203,10.7793918 11.7902954,10.3871006 L11.7071068,10.2928932 L9.415,8 L11.7071068,5.70710678 L11.7902954,5.61289944 C12.0953203,5.22060824 12.0675907,4.65337718 11.7071068,4.29289322 C11.3466228,3.93240926 10.7793918,3.90467972 10.3871006,4.20970461 L10.2928932,4.29289322 L8,6.585 L5.70710678,4.29289322 L5.61289944,4.20970461 Z",
    },
    {
      name: "copy",
      path: "M10,0 C11.1045695,0 12,0.8954305 12,2 L12,4 L14,4 C15.1045695,4 16,4.8954305 16,6 L16,14 C16,15.1045695 15.1045695,16 14,16 L6,16 C4.8954305,16 4,15.1045695 4,14 L4,12 L2,12 C0.8954305,12 0,11.1045695 0,10 L0,2 C0,0.8954305 0.8954305,0 2,0 L10,0 Z M14,6 L12,6 L12,10 C12,11.1045695 11.1045695,12 10,12 L6,12 L6,14 L14,14 L14,6 Z",
    },
    {
      name: "check",
      path: "M12.3358994,0.890599608 C12.9486043,-0.0284577698 14.190343,-0.276805507 15.1094004,0.335899411 C15.9825049,0.917969084 16.250294,2.06774173 15.7495722,2.96924064 L15.6641006,3.10940039 L7.66410059,15.1094004 C6.90290434,16.2511948 5.26035742,16.2951099 4.43136497,15.2411459 L4.33589941,15.1094004 L0.335899411,9.10940039 C-0.276805507,8.19034302 -0.0284577698,6.94860433 0.890599608,6.33589941 C1.76370412,5.75382974 2.92802851,5.94886009 3.56759606,6.75779512 L3.66410059,6.89059961 L6,10.393 L12.3358994,0.890599608 Z",
    },
    {
      name: "drag",
      path: "M5,12 C6.1045695,12 7,12.8954305 7,14 C7,15.1045695 6.1045695,16 5,16 C3.8954305,16 3,15.1045695 3,14 C3,12.8954305 3.8954305,12 5,12 Z M11,12 C12.1045695,12 13,12.8954305 13,14 C13,15.1045695 12.1045695,16 11,16 C9.8954305,16 9,15.1045695 9,14 C9,12.8954305 9.8954305,12 11,12 Z M5,6 C6.1045695,6 7,6.8954305 7,8 C7,9.1045695 6.1045695,10 5,10 C3.8954305,10 3,9.1045695 3,8 C3,6.8954305 3.8954305,6 5,6 Z M11,6 C12.1045695,6 13,6.8954305 13,8 C13,9.1045695 12.1045695,10 11,10 C9.8954305,10 9,9.1045695 9,8 C9,6.8954305 9.8954305,6 11,6 Z M5,0 C6.1045695,0 7,0.8954305 7,2 C7,3.1045695 6.1045695,4 5,4 C3.8954305,4 3,3.1045695 3,2 C3,0.8954305 3.8954305,0 5,0 Z M11,0 C12.1045695,0 13,0.8954305 13,2 C13,3.1045695 12.1045695,4 11,4 C9.8954305,4 9,3.1045695 9,2 C9,0.8954305 9.8954305,0 11,0 Z",
    },
    {
      name: "dribbble",
      path: "M13.336 2.055c-1.078 1.242-2.469 2.203-4.227 2.906A29.6 29.6 0 0 0 6 .258a7.931 7.931 0 0 1 7.336 1.797zM4.648.742a29.324 29.324 0 0 1 3.149 4.664c-2.078.61-4.594.946-7.633 1 .5-2.515 2.203-4.61 4.484-5.664zm9.54 2.188A8 8 0 0 1 16 7.96c-1.984-.444-3.852-.53-5.594-.241a30.746 30.746 0 0 0-.742-1.68c1.852-.742 3.352-1.781 4.524-3.11zM8.444 8.219c-2.515.89-4.648 2.633-6.336 5.21A7.998 7.998 0 0 1 0 8v-.367c3.352-.063 6.094-.43 8.352-1.133.257.516.484 1.016.703 1.54-.203.054-.407.108-.61.179zm2.407.672c1.757-.258 3.5-.079 5.054.312a7.93 7.93 0 0 1-3.5 5.461c-.312-1.719-.773-3.68-1.554-5.773zM9.5 9.164c.852 2.266 1.336 4.375 1.648 6.188C10.164 15.782 9.11 16 8 16a8.004 8.004 0 0 1-4.96-1.719c1.866-2.945 4.147-4.469 6.46-5.117z",
    },
    {
      name: "email",
      path: "M15.141 2.357L8 6.821.859 2.357A1.99 1.99 0 0 1 2 2h12c.424 0 .818.132 1.141.357zM16 4.18V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4.18l7.47 4.668a1 1 0 0 0 1.06 0L16 4.179z",
    },
    {
      name: "external",
      path: "M15 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V3.414L1.707 15.707a1 1 0 1 1-1.414-1.414L12.586 2H8a1 1 0 1 1 0-2h7z",
    },
    {
      name: "list",
      path: "M14,12 C15.1045695,12 16,12.8954305 16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 C0,12.8954305 0.8954305,12 2,12 L14,12 Z M14,6 C15.1045695,6 16,6.8954305 16,8 C16,9.1045695 15.1045695,10 14,10 L2,10 C0.8954305,10 0,9.1045695 0,8 C0,6.8954305 0.8954305,6 2,6 L14,6 Z M14,0 C15.1045695,0 16,0.8954305 16,2 C16,3.1045695 15.1045695,4 14,4 L2,4 C0.8954305,4 0,3.1045695 0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z",
    },
    {
      name: "minus",
      path: "M16,8 C16,9.1045695 15.1045695,10 14,10 L2,10 C0.8954305,10 0,9.1045695 0,8 C0,6.8954305 0.8954305,6 2,6 L14,6 C15.1045695,6 16,6.8954305 16,8 Z",
    },
    {
      name: "twitter",
      path: "M16 3.031c-.445.672-1 1.242-1.633 1.703v.43c0 4.336-3.297 9.336-9.328 9.336-1.851 0-3.594-.406-5.039-1.336.258.04.516.055.781.055 1.531 0 2.961-.664 4.07-1.555-1.421-.016-2.648-.984-3.054-2.281.203.039.406.062.61.062.296 0 .593-.039.874-.117A3.28 3.28 0 0 1 .648 6.11V6.07c.446.242.946.39 1.485.407a3.266 3.266 0 0 1-1.469-2.72c0-.609.172-1.109.445-1.593 1.633 1.984 4.04 3.219 6.758 3.367a3.42 3.42 0 0 1-.07-.758A3.268 3.268 0 0 1 11.07 1.5c.946 0 1.797.406 2.414 1.031a6.59 6.59 0 0 0 2.07-.797 3.254 3.254 0 0 1-1.445 1.82A6.402 6.402 0 0 0 16 3.032z",
    },
  ];
  const filtered = icons.filter((value) => value.name === name)[0];
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${size}"
  height="${size}"
  viewBox="0 0 16 16"
  aria-hidden="true"
  focusable="false"
  role="presentation"
>
  <title>${name} icon</title>
  <path fill="currentColor" d="${filtered.path}" />
</svg>
`;
};
module.exports = function (name, size = 16) {
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
      name: "code",
      path: "M10.2747211,0.0384760524 C10.7678251,0.179362893 11.0681803,0.666666522 10.9870934,1.16073887 L10.9615239,1.27472113 L6.96152395,15.2747211 C6.80979966,15.8057561 6.25631388,16.1132482 5.72527887,15.9615239 C5.23217493,15.8206371 4.93181973,15.3333335 5.01290664,14.8392611 L5.03847605,14.7252789 L9.03847605,0.725278872 C9.19020034,0.194243859 9.74368612,-0.113248237 10.2747211,0.0384760524 Z M4.70710678,4.29289322 C5.06759074,4.65337718 5.09532028,5.22060824 4.79029539,5.61289944 L4.70710678,5.70710678 L2.415,8 L4.70710678,10.2928932 C5.06759074,10.6533772 5.09532028,11.2206082 4.79029539,11.6128994 L4.70710678,11.7071068 C4.34662282,12.0675907 3.77939176,12.0953203 3.38710056,11.7902954 L3.29289322,11.7071068 L0.292893219,8.70710678 C-0.0675907428,8.34662282 -0.0953202783,7.77939176 0.209704612,7.38710056 L0.292893219,7.29289322 L3.29289322,4.29289322 C3.68341751,3.90236893 4.31658249,3.90236893 4.70710678,4.29289322 Z M11.2928932,4.29289322 C11.6533772,3.93240926 12.2206082,3.90467972 12.6128994,4.20970461 L12.7071068,4.29289322 L15.7071068,7.29289322 L15.7902954,7.38710056 C16.0699015,7.74670083 16.0699015,8.25329917 15.7902954,8.61289944 L15.7071068,8.70710678 L12.7071068,11.7071068 L12.6128994,11.7902954 C12.2532992,12.0699015 11.7467008,12.0699015 11.3871006,11.7902954 L11.2928932,11.7071068 L11.2097046,11.6128994 C10.9300985,11.2532992 10.9300985,10.7467008 11.2097046,10.3871006 L11.2928932,10.2928932 L13.585,8 L11.2928932,5.70710678 L11.2097046,5.61289944 C10.9046797,5.22060824 10.9324093,4.65337718 11.2928932,4.29289322 Z",
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
      name: "pineapple",
      path: "M8.00014269,14.8035 L9.66081052,15.9456961 C9.44589605,15.981415 9.22518975,16 9.00014269,16 L7.00014269,16 C6.77516524,16 6.55452587,15.9814265 6.3396743,15.9457292 L8.00014269,14.8035 Z M5.09114269,12.8035 L7.55814269,14.5 L5.69443107,15.7820409 C4.7449789,15.4543105 3.95748196,14.77913 3.48392471,13.9084839 L5.09114269,12.8035 Z M10.9091427,12.8035 L12.5163607,13.9084839 C12.0428009,14.7791347 11.255298,15.4543178 10.3058389,15.7820462 L8.44164269,14.5 L10.9091427,12.8035 Z M8.00014269,10.8035 L10.4671427,12.5 L8.00014269,14.196 L5.53264269,12.5 L8.00014269,10.8035 Z M3,11.3655 L4.64964269,12.5 L3.2704528,13.4484524 C3.0959033,12.9993155 3.00014269,12.5108408 3.00014269,12 L3,11.3655 Z M13,11.366 L13.0001427,12 C13.0001427,12.5108408 12.9043821,12.9993155 12.7298326,13.4484524 L11.3506427,12.5 L13,11.366 Z M5.45464269,9.0535 L7.55864269,10.5 L5.09114269,12.1965 L3,10.7585 L3,10.7415 L5.45464269,9.0535 Z M10.5456427,9.0535 L13,10.7405 L13,10.7575 L10.9091427,12.196 L8.44164269,10.5 L10.5456427,9.0535 Z M8.00014269,7.3035 L10.1036427,8.7495 L8.00014269,10.196 L5.89614269,8.7495 L8.00014269,7.3035 Z M3.2704528,7.55154763 L5.01314269,8.75 L3,10.134 L3.00014269,9 C3.00014269,8.48915921 3.0959033,8.00068451 3.2704528,7.55154763 Z M12.7298326,7.55154763 C12.9043821,8.00068451 13.0001427,8.48915921 13.0001427,9 L13,10.1335 L10.9871427,8.75 L12.7298326,7.55154763 Z M10.75881,5.40635308 C11.5049217,5.77217534 12.1203896,6.36351402 12.5163607,7.09151613 L10.5456427,8.446 L8.44164269,6.9995 L10.75881,5.40635308 Z M5.24147535,5.40635308 L7.55864269,6.9995 L5.45464269,8.446 L3.48392471,7.09151613 C3.87989579,6.36351402 4.49536367,5.77217534 5.24147535,5.40635308 Z M9.00014269,5 C9.41825814,5 9.82139015,5.06415171 10.2002328,5.18314923 L8.00014269,6.696 L5.80006814,5.18314433 C6.17890629,5.06414995 6.58203298,5 7.00014269,5 L9.00014269,5 Z M12.121463,0.878679656 C11.9597026,1.98324916 11.4882981,2.9260582 10.7072495,3.70710678 C10.3772558,4.03710046 10.0397444,4.32437879 9.71640401,4.55809743 C9.60481154,4.53883731 9.49166529,4.52507128 9.37730519,4.51558159 C9.45881995,4.05748019 9.50014269,3.54310333 9.50014269,3 C9.50014269,2.71188133 9.47935006,2.42985067 9.43784133,2.15411413 C10.1890892,1.45577998 11.0839129,1.03062536 12.121463,0.878679656 Z M3.87882234,0.878679656 C4.91636533,1.03062431 5.81118384,1.4557741 6.56327787,2.15412904 C6.52093531,2.42985067 6.50014269,2.71188133 6.50014269,3 C6.50014269,3.54316529 6.54147485,4.05759756 6.62262089,4.51651022 C6.50853556,4.52507829 6.39530658,4.53885766 6.28345394,4.556759 C5.96054096,4.32437879 5.62302959,4.03710046 5.29303591,3.70710678 C4.51198732,2.9260582 4.0405828,1.98324916 3.87882234,0.878679656 Z M8.00014269,0 C8.66680935,0.8954305 9.00014269,1.8954305 9.00014269,3 C9.00014269,3.33137085 8.98223408,3.65019336 8.94916202,3.94823203 L8.91716508,4.19841175 C8.90205546,4.30232298 8.88504092,4.4031691 8.86625384,4.50055299 L7.13403154,4.50055299 C7.11524445,4.4031691 7.09822992,4.30232298 7.08312029,4.19841175 L7.05112335,3.94823203 C7.0180513,3.65019336 7.00014269,3.33137085 7.00014269,3 C7.00014269,1.8954305 7.33347602,0.8954305 8.00014269,0 Z",
    },
    {
      name: "twitter",
      path: "M16 3.031c-.445.672-1 1.242-1.633 1.703v.43c0 4.336-3.297 9.336-9.328 9.336-1.851 0-3.594-.406-5.039-1.336.258.04.516.055.781.055 1.531 0 2.961-.664 4.07-1.555-1.421-.016-2.648-.984-3.054-2.281.203.039.406.062.61.062.296 0 .593-.039.874-.117A3.28 3.28 0 0 1 .648 6.11V6.07c.446.242.946.39 1.485.407a3.266 3.266 0 0 1-1.469-2.72c0-.609.172-1.109.445-1.593 1.633 1.984 4.04 3.219 6.758 3.367a3.42 3.42 0 0 1-.07-.758A3.268 3.268 0 0 1 11.07 1.5c.946 0 1.797.406 2.414 1.031a6.59 6.59 0 0 0 2.07-.797 3.254 3.254 0 0 1-1.445 1.82A6.402 6.402 0 0 0 16 3.032z",
    },
    {
      name: "codepen",
      path: "M7.795 15.972a.944.944 0 0 1-.11-.04.776.776 0 0 1-.104-.058l.079.045a.756.756 0 0 1-.066-.037l-.013-.008L.34 11.067a.758.758 0 0 1-.16-.142l-.05-.066A.772.772 0 0 1 0 10.437V5.564a.757.757 0 0 1 .126-.419l.015-.022a.757.757 0 0 1 .049-.06l-.064.082a.76.76 0 0 1 .213-.212l-.075.056a.751.751 0 0 1 .048-.038l.027-.018L7.58.126A.762.762 0 0 1 8 0l.11.008a.757.757 0 0 1 .309.118l-.087-.05a.756.756 0 0 1 .08.045l.007.005 7.242 4.807a.758.758 0 0 1 .163.146l.05.066a.772.772 0 0 1 .126.419v4.885a.757.757 0 0 1-.129.41l-.02.029a.757.757 0 0 1-.037.045l.057-.074a.76.76 0 0 1-.21.208l.067-.05a.751.751 0 0 1-.029.023l-.038.027-7.242 4.807a.762.762 0 0 1-.316.119L8 16a.758.758 0 0 1-.205-.028Zm3.799-7.079-2.837 1.883v3.055l5.122-3.4-2.285-1.538Zm-7.188.001L2.12 10.431l5.122 3.399v-3.054L4.406 8.894ZM8 6.476 5.767 7.978 8 9.461l2.233-1.483L8 6.476Zm-6.486.498v2.039L3.04 7.987 1.514 6.974Zm12.971 0-1.526 1.013 1.526 1.026V6.974ZM7.242 2.167 2.126 5.563 4.4 7.072 7.242 5.16V2.167Zm1.515.001V5.16l2.842 1.912 2.274-1.509-5.116-3.395Z",
    },
  ];
  const filtered = icons.filter((value) => value.name === name)[0];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation"><title>${name} icon</title><path fill="currentColor" d="${filtered.path}" /></svg>`;
};

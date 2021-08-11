module.exports = function (item) {
  const images = [
    {
      name: "Research",
      white:
        "M40 40c8.837 0 16-7.163 16-16S48.837 8 40 8s-16 7.163-16 16 7.163 16 16 16z",
      black:
        "M22.337 40.249A23.914 23.914 0 0 1 16 24C16 10.745 26.745 0 40 0s24 10.745 24 24-10.745 24-24 24a23.914 23.914 0 0 1-16.249-6.337l-8.305 8.305a4.002 4.002 0 0 1-.618 4.86l-8 8a4 4 0 1 1-5.656-5.656l8-8a4.002 4.002 0 0 1 4.86-.618l8.305-8.305zM40 46c12.15 0 22-9.85 22-22S52.15 2 40 2s-22 9.85-22 22 9.85 22 22 22zm0-4c-9.941 0-18-8.059-18-18S30.059 6 40 6s18 8.059 18 18-8.059 18-18 18zm0-2c8.837 0 16-7.163 16-16S48.837 8 40 8s-16 7.163-16 16 7.163 16 16 16z",
      green:
        "M40 46c-12.15 0-22-9.85-22-22S27.85 2 40 2s22 9.85 22 22-9.85 22-22 22zm0-4c9.941 0 18-8.059 18-18S49.941 6 40 6s-18 8.059-18 18 8.059 18 18 18zm-5-20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm11-1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-1 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-11-1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
    },
    {
      name: "Style",
      white:
        "M21.648 17.863a3 3 0 0 1 3.888-4.44A21.915 21.915 0 0 1 40 8c12.15 0 22 9.85 22 22s-9.85 22-22 22-22-9.85-22-22c0-4.486 1.343-8.658 3.648-12.137zM16 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
      black:
        "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-2c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16s6.268 14 14 14zm26.405 23.881C41.614 53.96 40.812 54 40 54c-13.255 0-24-10.745-24-24 .68 0 1.347-.048 2-.142V30c0 12.15 9.85 22 22 22 .771 0 1.534-.04 2.285-.117l-.804-13.37a1 1 0 0 1 1.548-.894l12.324 8.138A21.934 21.934 0 0 0 62 30c0-12.15-9.85-22-22-22-3.987 0-7.727 1.06-10.952 2.915a13.936 13.936 0 0 0-.861-1.811A23.89 23.89 0 0 1 40 6c13.255 0 24 10.745 24 24 0 6.583-2.65 12.547-6.942 16.883l6.49 4.287c.847.559.42 1.877-.593 1.833l-12.386-.536-5.728 10.994c-.469.9-1.824.61-1.885-.402l-.551-9.178z",
      green:
        "M16 30C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14zM8 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm20.735 40.337L43.597 40.39l15.839 10.46-9.416-.408a1 1 0 0 0-.93.537l-4.355 8.358z",
    },
    {
      name: "Present",
      white: "M2 10v44h60V10z",
      black:
        "M20 16v-2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v2h10a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H44v2a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2v-2H10a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2h10zm0 2H10v28h10V18zm24 0v28h10V18H44zM2 8h60a2 2 0 0 1 2 2v44a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zm0 2v44h60V10H2zm20 4v36h20V14H22z",
      green:
        "M20 18v28H10V18h10zm24 0h10v28H44V18zM32 30a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-7 2h14a1 1 0 0 1 0 2H25a1 1 0 0 1 0-2zm0 4h14a1 1 0 0 1 0 2H25a1 1 0 0 1 0-2zm2 4h10a1 1 0 0 1 0 2H27a1 1 0 0 1 0-2z",
    },
    {
      name: "Build",
      white: "M2 10v44h60V10z",
      black:
        "M2 8h60a2 2 0 0 1 2 2v10H0V10a2 2 0 0 1 2-2zm0 10h60v-8H2v8zM2 8h60a2 2 0 0 1 2 2v44a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zm0 2v44h60V10H2z",
      green:
        "M23.447 30.895L11.236 37l12.21 6.106a1 1 0 1 1-.894 1.789l-14-7a1 1 0 0 1 0-1.79l14-7a1 1 0 1 1 .895 1.79zm17.106 0a1 1 0 1 1 .895-1.79l14 7a1 1 0 0 1 0 1.79l-14 7a1 1 0 1 1-.895-1.79L52.764 37l-12.21-6.105zM26.09 47.586l10-22a1 1 0 0 1 1.82.828l-10 22a1 1 0 0 1-1.82-.828zM2 18v-8h60v8H2zm4-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    },
    {
      name: "Iterate",
      white:
        "M5 5.732A2 2 0 1 1 5.732 5h18.536a2 2 0 1 1 3.465 0H59v54H5V27.732a2 2 0 1 1 0-3.465V5.733z",
      black:
        "M25 22.126V7.874A4.007 4.007 0 0 1 22.126 5H7.874A4.007 4.007 0 0 1 5 7.874v14.252A4.007 4.007 0 0 1 7.874 25h14.252A4.007 4.007 0 0 1 25 22.126zM22.126 27H7.874A4.007 4.007 0 0 1 5 29.874V59h54V5H29.874A4.007 4.007 0 0 1 27 7.874v14.252A4.002 4.002 0 0 1 26 30a4.002 4.002 0 0 1-3.874-3zm7.748-24H59a2 2 0 0 1 2 2v54a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V29.874a4.002 4.002 0 0 1 0-7.748V7.874A4.002 4.002 0 0 1 4 0a4.002 4.002 0 0 1 3.874 3h14.252a4.002 4.002 0 0 1 7.748 0zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM26 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
      green:
        "M7.874 5h14.252A4.007 4.007 0 0 0 25 7.874v14.252A4.007 4.007 0 0 0 22.126 25H7.874A4.007 4.007 0 0 0 5 22.126V7.874A4.007 4.007 0 0 0 7.874 5zM53 51.586V40a1 1 0 0 1 2 0v14a1 1 0 0 1-1 1H40a1 1 0 0 1 0-2h11.586L31.293 32.707a1 1 0 0 1 1.414-1.414L53 51.586z",
    },
  ];
  const filtered = images.filter((value) => value.name === item.img)[0];
  return `
<section class="gallery__item">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
    role="presentation"
  >
    <title>${filtered.name} icon</title>
    <g>
      <path fill="var(--color__contrast)" d="${filtered.white}" />
      <path fill="var(--color__base)" d="${filtered.black}" />
      <path fill="var(--color__highlight)" d="${filtered.green}" />
    </g>
  </svg>
  <h3>${item.label}</h3>
  <p>${item.description}</p>
</section>
`;
};

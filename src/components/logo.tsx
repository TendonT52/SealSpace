"use client"
import { useState } from "react"

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="inline-block">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52 26C52 40.3594 40.3594 52 26 52C11.6406 52 0 40.3594 0 26C0 11.6406 11.6406 0 26 0C40.3594 0 52 11.6406 52 26Z"
          fill="url(#paint0_linear_72_1053)"
        />
        <rect x="15.8004" y="15.093" width="19.6916" height="9.31519" fill="#002F61" />
        <path
          d="M37.9282 16.3315C38.9605 19.2537 38.9717 22.1829 37.9618 25.1192C37.8532 25.4352 37.7474 25.7269 37.6447 25.9945C37.6312 26.029 37.6269 26.0664 37.6322 26.1031C37.6374 26.1397 37.6521 26.1743 37.6748 26.2035C39.8372 29.0144 41.2422 32.3948 41.4468 35.9436C41.5242 37.1596 41.3759 38.3451 41.0021 39.5003C40.1694 42.0737 37.7767 44.3158 34.9153 43.5788C34.2828 43.313 33.397 42.9144 32.667 41.9913C28.2306 42.6734 23.799 42.6666 19.3721 41.9709C19.3325 41.965 19.3006 41.9783 19.2764 42.0108C18.1168 43.5894 16.1095 44.1502 14.2952 43.3901C12.7565 42.7455 11.695 41.187 11.3276 40.4508C10.37 38.532 10.3868 36.1916 10.719 34.1045C11.262 31.1883 12.5324 28.52 14.3448 26.1291C14.353 26.1183 14.3582 26.1055 14.3601 26.0921C14.362 26.0786 14.3604 26.0648 14.3555 26.052C13.3155 23.2837 12.9921 20.581 13.645 17.6789C16.5108 5.70384 33.7008 4.92428 37.9282 16.3315ZM34.373 17.6505C34.3646 17.4123 34.3085 17.1781 34.2077 16.9612C34.1069 16.7444 33.9634 16.5492 33.7854 16.3868C33.6075 16.2243 33.3986 16.0978 33.1706 16.0145C32.9426 15.9312 32.7 15.8927 32.4566 15.9012C31.9652 15.9184 31.5006 16.1259 31.1649 16.4783C30.8293 16.8306 30.6502 17.2988 30.667 17.7799C30.6753 18.0181 30.7315 18.2524 30.8323 18.4692C30.9331 18.686 31.0766 18.8812 31.2545 19.0437C31.4325 19.2061 31.6414 19.3326 31.8694 19.4159C32.0974 19.4992 32.34 19.5377 32.5833 19.5292C33.0748 19.5121 33.5394 19.3045 33.875 18.9522C34.2106 18.5998 34.3898 18.1316 34.373 17.6505ZM21.3448 17.7843C21.3473 17.3078 21.154 16.8499 20.8074 16.5111C20.4608 16.1724 19.9893 15.9807 19.4966 15.9781C19.004 15.9755 18.5305 16.1623 18.1804 16.4974C17.8302 16.8325 17.6321 17.2884 17.6296 17.7648C17.6271 18.2413 17.8205 18.6993 18.1671 19.038C18.5137 19.3767 18.9852 19.5685 19.4778 19.5711C19.9705 19.5736 20.444 19.3868 20.7941 19.0518C21.1442 18.7167 21.3423 18.2608 21.3448 17.7843ZM26.3588 21.0177C27.0436 20.9681 28.1713 20.441 27.925 19.5906C27.8382 19.2894 27.5884 19.0741 27.3049 18.9581C26.624 18.6805 25.9183 18.63 25.1877 18.8066C24.8298 18.8928 24.593 18.9903 24.4773 19.0989C23.424 20.0884 24.7085 20.9566 25.6608 21.0257C25.6915 21.028 25.7068 21.0449 25.7068 21.0762L25.7113 22.6238C25.7113 22.6634 25.7012 22.7024 25.682 22.7371C25.6628 22.7718 25.6351 22.8011 25.6014 22.8222C25.2719 23.0289 24.9234 23.0699 24.5561 22.9453C24.5257 22.935 24.4995 22.9151 24.4817 22.8886C24.3603 22.707 24.184 22.3766 23.9094 22.4962C23.742 22.5688 23.7181 22.769 23.7774 22.9303C24.0999 23.7984 25.3365 23.7382 25.9673 23.3209C25.9921 23.3044 26.0169 23.3041 26.0417 23.3201C26.5508 23.6502 27.0776 23.7095 27.6221 23.4981C27.9233 23.3812 28.2005 23.1349 28.243 22.8178C28.2909 22.4555 27.8391 22.3137 27.7053 22.7177C27.6961 22.7454 27.6789 22.77 27.6557 22.7885C27.3894 22.9994 27.0923 23.059 26.7645 22.9675C26.5395 22.9046 26.3207 22.8222 26.3083 22.5715C26.2965 22.3412 26.2977 21.8395 26.3119 21.0664C26.3125 21.0363 26.3281 21.0201 26.3588 21.0177Z"
          fill="white"
        />
        <path
          d="M33.27 36.6947C32.388 38.1564 31.5366 40.2381 32.6883 42.0341C33.8398 43.5602 35.8916 44.1734 37.7059 43.4134C39.2446 42.7687 40.3061 41.2102 40.6735 40.4741C41.6311 38.5553 41.6719 35.4787 40.9632 32.8654C39.1094 32.8654 34.8917 34.0073 33.27 36.6947Z"
          fill="url(#paint1_radial_72_1053)"
          fillOpacity="0.2"
        />
        <path
          d="M18.7211 36.6947C19.6032 38.1564 20.4545 40.2381 19.3029 42.0341C18.1513 43.5602 16.0995 44.1734 14.2852 43.4134C12.7465 42.7687 11.685 41.2102 11.3176 40.4741C10.36 38.5553 10.3192 35.4787 11.0279 32.8654C12.8817 32.8654 17.0994 34.0073 18.7211 36.6947Z"
          fill="url(#paint2_radial_72_1053)"
          fillOpacity="0.2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_72_1053"
            x1="26.059"
            y1="-9.60998"
            x2="26.059"
            y2="79.7097"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#57999A" />
            {!isHovered ? <stop offset="1" stopColor="#175579" /> : <stop offset="1" stopColor="#002F61" />}
          </linearGradient>
          <radialGradient
            id="paint1_radial_72_1053"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(40.9622 32.8654) rotate(130.128) scale(15.9305 13.6139)"
          >
            <stop offset="0.307292" stopColor="#0047FF" stopOpacity="0" />
            <stop offset="1" stopColor="#0070F4" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_72_1053"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(11.029 32.8654) rotate(49.8722) scale(15.9305 13.6139)"
          >
            <stop offset="0.307292" stopColor="#0047FF" stopOpacity="0" />
            <stop offset="1" stopColor="#0070F4" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
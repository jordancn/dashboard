import {
  MOBILE_LANDSCAPE_MEDIA_SELECTOR,
  MOBILE_PORTRAIT_MEDIA_SELECTOR,
  TABLET_LANDSCAPE_MEDIA_SELECTOR,
  TABLET_PORTRAIT_MEDIA_SELECTOR,
} from "@/Components/Configuration/Configuration";

const pageCss = `
  ${MOBILE_PORTRAIT_MEDIA_SELECTOR} {
    #page {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  ${TABLET_PORTRAIT_MEDIA_SELECTOR} {
    #page {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  ${MOBILE_LANDSCAPE_MEDIA_SELECTOR} {
    #page {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  ${TABLET_LANDSCAPE_MEDIA_SELECTOR} {
    #page {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  @media (prefers-color-scheme: dark) {
    .icon {
      fill: white;
    }

    .icon-selected {
      fill: #007aff;
    }

    .sidebar-icon {
      fill: #007aff;
    }

    .sidebar-icon-selected {
      fill: white;
    }
  }

  @media (prefers-color-scheme: light) {
    .icon {
      fill: #333333;
    }

    .icon-selected {
      fill: #007aff;
    }

    .sidebar-icon {
      fill: #007aff;
    }

    .sidebar-icon-selected {
      fill: white;
    }
  }

  #page {
  }
`;

// TODO use css

export const Page = (props: { children?: React.ReactNode }) => {
  console.debug("pageCss", pageCss);

  return (
    <>
      <div id="page">{props.children}</div>
    </>
  );
};

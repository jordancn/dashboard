import {
  MOBILE_LANDSCAPE_MEDIA_SELECTOR,
  MOBILE_PORTRAIT_MEDIA_SELECTOR,
  TABLET_LANDSCAPE_MEDIA_SELECTOR,
  TABLET_PORTRAIT_MEDIA_SELECTOR,
  TOOLBAR_HEIGHT,
} from "@/Components/Configuration/Configuration";
import React from "react";

const globalCss = `
  #root {
    /* background-color: white !important; */
  }

  ${MOBILE_PORTRAIT_MEDIA_SELECTOR} {
    #toolbar {
      position: fixed;
      right: 0;
      height: ${TOOLBAR_HEIGHT}px;
      bottom: 0;
      left: 0;
    }

    #content {
      position: fixed;
      height: calc(100vh - ${TOOLBAR_HEIGHT}px);
      top: 0;
      right: 0;
    }
  }

  ${TABLET_PORTRAIT_MEDIA_SELECTOR} {
    #toolbar {
      display: hidden;
      opacity: 0;
    }

    #content {
      position: fixed;
      height: calc(100vh);
      top: 0;
      right: 0;
    }
  }

  ${MOBILE_LANDSCAPE_MEDIA_SELECTOR} {
    #toolbar {
      position: fixed;
      right: 0;
      height: ${TOOLBAR_HEIGHT}px;
      bottom: 0;
      left: 0;
    }

    #content {
      position: fixed;
      height: calc(100vh - ${TOOLBAR_HEIGHT}px);
      top: 0;
      right: 0;
    }
  }

  ${TABLET_LANDSCAPE_MEDIA_SELECTOR} {
    #toolbar {
      display: hidden;
      opacity: 0;
    }

    #content {
      position: fixed;
      top: 0;
      bottom: 0;
      font-family: system;
    }
  }

  @media (prefers-color-scheme: dark) {
    #toolbar {
      background-color: rgb(28, 29, 30);
      color: white;
    }

    #content,
    body {
      background-color: rgb(18, 18, 18);
      /* background-color: #272b2e; */
      color: white;
    }

    #navigation-bar {
      background-color: rgb(18, 18, 18);
      color: white;
    }
  }

  @media (prefers-color-scheme: light) {
    #toolbar {
      background-color: rgb(242, 242, 246);
      color: #333333;
    }

    #content,
    body {
      /* background-color: rgb(255, 255, 255); */
      /* background-color: #d2d6d7; */
      background-color: #f2f2f7;
      color: #333333;
    }

    #navigation-bar {
      background-color: rgb(242, 242, 246);
      color: #333333;
    }
  }

  #toolbar {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;

    z-index: 3;
  }

  #content {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    z-index: 1;
  }

  #content-container {
    z-index: 2;

    height: 100%;
  }

  #content-scrollable {
    overflow-y: auto;

    z-index: 3;

    height: calc(100%);
  }

  *::-webkit-scrollbar {
    display: none;
  }

  * {
    scrollbar-width: none;
  }
`;

export const AppProvider = (props: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      {/*
      TODO 
      <Global styles={globalCss} />
      <Helmet>
        <meta name='msapplication-TileColor' content='#000000' />
        <meta name='theme-color' content='#000000' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black'></meta>
        <title>{props.title}</title>
      </Helmet> */}

      {props.children}
    </>
  );
};

package com.wizard.frontapp;

import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.reactnativenavigation.NavigationActivity;

//public class MainActivity extends ReactActivity {
public class MainActivity extends NavigationActivity {
//  /**
//   * Returns the name of the main component registered from JavaScript. This is used to schedule
//   * rendering of the component.
//   */
//  @Override
//  protected String getMainComponentName() {
//    return "FrontApp";
//  }
//
//  /**
//   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
//   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
//   * (aka React 18) with two boolean flags.
//   */
//  @Override
//  protected ReactActivityDelegate createReactActivityDelegate() {
//    return new DefaultReactActivityDelegate(
//        this,
//        getMainComponentName(),
//        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
//        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
//        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
//        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
//        );
//  }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideNavigationBar();
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideNavigationBar();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideNavigationBar();
        }
    }

    private void hideNavigationBar() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

    }
}

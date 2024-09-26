import {Image, StyleSheet, Platform, View, BackHandler, StatusBar} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebView from "react-native-webview";
import {useEffect, useRef, useState} from "react";

export default function HomeScreen() {
    const webViewRef = useRef(null); // Create a reference to the WebView
    const [canGoBack, setCanGoBack] = useState(false); // State to check if WebView can go back

    // Listen to navigation state changes
    const handleNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack); // Update canGoBack state
    };

    // Handle the back button on Android
    const handleBackPress = () => {
        if (canGoBack) {
            webViewRef.current.goBack(); // Go back if WebView can go back
            return true; // Prevent default behavior
        }
        return false; // Allow default back button behavior if WebView can't go back
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        }
        return () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            }
        };
    }, [canGoBack]);

    return (
        <View style={{ flex: 1 }}>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://medadvisor.pro/' }}
                onNavigationStateChange={handleNavigationStateChange} // Track navigation state
                style={{ flex: 1, marginTop:30 }}
            />
        </View>
    );
}

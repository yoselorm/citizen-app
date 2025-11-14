import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Stack } from 'expo-router'
import SplashScreen from './SplashScreen';

const RootLayout = () => {
    const colorScheme = useColorScheme();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })
    return (
        <>
            {loading ? (<SplashScreen />) : (
                
                <>
                <Redirect href="/(tabs)" />
                <Stack screenOptions={{ headerShown: false }} >
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                </Stack>
                
              </>
            )}
        </>
    )
}

export default RootLayout

const styles = StyleSheet.create({})
import { View, Text } from 'react-native'
import React from 'react'
import {  Tabs } from 'expo-router'
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const _layout = () => {
  return (
  <Tabs>
    <Tabs.Screen 
     name='index'
     options={{
        headerShown: false,
         title: 'Analytics',
         tabBarIcon: ({ color, focused }) => (
             <MaterialCommunityIcons
                 size={24}
                 color={color}
                 name='home-analytics'
                 focused={focused}
             />
         ),
         tabBarLabel: "Analytics"
     }}/>
    <Tabs.Screen 
     name='ViewIssues'
     options={{
        headerShown: false,
         title: 'View Issues',
         tabBarIcon: ({ color, focused }) => (
             <MaterialIcons
                 size={24}
                 color={color}
                 name='view-cozy'
                 focused={focused}
             />
         ),
         tabBarLabel: "View Issues"
     }}/>

    <Tabs.Screen 
     name='ReportIssue'
     options={{
        headerShown: false,
         title: 'Report Issue',
         tabBarIcon: ({ color, focused }) => (
             <MaterialIcons
                 size={24}
                 color={color}
                 name='report-problem'
                 focused={focused}
             />
         ),
         tabBarLabel: "Report Issue"
     }}/>
  </Tabs>
  )
}

export default _layout
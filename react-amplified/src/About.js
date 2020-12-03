import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries';
import './App.css';
import background from './background.jpg';
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';
import Login from './Login.js'

const About = () => {
    return(
        <>
        </>
    )
}

export default About
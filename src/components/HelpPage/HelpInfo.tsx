import React from 'react';
import {
  Box,
  Typography,
  Link,
} from '@material-ui/core';
import TextCard from './TextCard';

const HelpInfo: React.FC = () => {
  const cardTextTables = [
    [
      'git clone https://github.com/mateusz-chochol/FlixBus-Ripoff.git',
      'cd flixbus-ripoff',
      'npm install',
      'npm install -g serve',
      'npm run build',
      'serve -s build',
    ],
    [
      'git clone https://github.com/mateusz-chochol/FlixBus-Ripoff.git',
      'cd flixbus-ripoff',
      'docker-compose up',
    ],
    [
      'REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>',
      'REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>',
      'REACT_APP_FIREBASE_DATABASE_URL=<your_firebase_database_url>',
      'REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>',
      'REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>',
      'REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>',
      'REACT_APP_GOOGLE_MAPS_API_KEY=<your_googlemaps_api_key>',
    ],
    [
      'auth.useEmulator("http://localhost:9099")',
      'firestore.useEmulator("localhost", 8080)',
    ],
  ]

  return (
    <>
      <Typography variant='h4'>
        How to run the website locally
      </Typography>
      <Box paddingTop={2}>
        <Typography variant='subtitle1' gutterBottom>
          You can run it either manually with <b>npm</b> and <b>serve</b>
        </Typography>
      </Box>
      <TextCard cardTextTable={cardTextTables[0]} />
      <Box paddingTop={3}>
        <Typography variant='subtitle1' gutterBottom>
          Or you can do it with <b>docker</b>
        </Typography>
      </Box>
      <Box paddingBottom={5}>
        <TextCard cardTextTable={cardTextTables[1]} />
        <Box paddingTop={3}>
          <Typography variant='subtitle1'>
            Site should be visible under the address: <Link href='http://localhost:5000'>http://localhost:5000</Link>
          </Typography>
        </Box>
      </Box>
      <Typography variant='h4' gutterBottom>
        What are the prerequisites
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        • <Link href='https://nodejs.org/en/download/'><b>npm</b></Link> or <Link href='https://www.docker.com/products/docker-desktop'><b>docker</b></Link>
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        • <b>.env</b> file that contains all the firebase and Google Maps API keys with below content
      </Typography>
      <TextCard cardTextTable={cardTextTables[2]} />
      <Box paddingTop={3}>
        <Typography variant='subtitle1' gutterBottom>
          • Working firebase <b>firestore</b> and <b>authentication</b> emulators on ports respectively <b>8080</b> and <b>9099</b> or deletion of below code in <b>src/components/App.tsx</b> file
        </Typography>
      </Box>
      <TextCard cardTextTable={cardTextTables[3]} />
    </>
  )
}

export default HelpInfo;
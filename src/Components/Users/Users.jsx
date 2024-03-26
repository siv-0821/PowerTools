import { useState, useEffect } from 'react';
import './Users.css'
import { Card, CardContent, Typography } from '@mui/material';

function Users() {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', loggedIn: true },
    { id: 2, name: 'User 2', loggedIn: false },
    { id: 3, name: 'User 3', loggedIn: true },
    
  ]);

  useEffect(() => {
    // Fetch user data or perform any other initialization
  }, []);

  return (
    <div className='user-body'>
      {users.map(user => (
        <Card key={user.id} style={{ width: 300, margin: 10 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2">
              {user.loggedIn ? 'Logged In' : 'Logged Out'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Users;

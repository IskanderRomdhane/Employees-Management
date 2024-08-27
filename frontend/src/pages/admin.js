import React from 'react'
import SoldeCongeApi from '../api/SoldeCongeApi';
import DispalyAllConges from '../api/DispalyAllConges';
const Admin = () => {
  return (
    <div>
        {<SoldeCongeApi />}
        {<DispalyAllConges />}
    </div>
  )
}

export default Admin;
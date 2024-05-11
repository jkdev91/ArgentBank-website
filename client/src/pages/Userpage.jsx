import AmountItem from '../components/AccountItem.jsx'
import Edit from '../components/editUserName.jsx'


function Userprofil() {
  return (
    <>
    <main className="main bg-dark">
      <Edit />
      <h2 className="sr-only">Accounts</h2>
      <AmountItem
      title ='Argent Bank Checking (x8349)'
      amount = '$2,082.79'
      description = "Available Balance" 
      />
      <AmountItem
      title ='Argent Bank Savings (x6712)'
      amount = '$10,928.42'
      description = "Available Balance" 
      />
      <AmountItem
      title ='Argent Bank Credit Card (x8349)'
      amount = '$184.30'
      description = "Current Balance" 
      />
    </main>
    </>   
  )
}

export default Userprofil
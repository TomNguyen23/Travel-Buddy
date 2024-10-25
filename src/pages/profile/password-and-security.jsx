import ChangePasswordCard from "@/components/cards/change-password_card";
import RemoveAccountCard from "@/components/cards/remove-account_card";


const PasswordAndSecurity = () => {
    return ( 
        <>
            <h1 className="text-3xl font-semibold">Cài đặt</h1>

            <ChangePasswordCard />
            <RemoveAccountCard />
        </>
     );
}
 
export default PasswordAndSecurity;
import {ReceptionInputFrom} from "../features/Reception"
import PageHeader from "../components/ui/PageHeader"
const Reception = ()=>{
    return (
    <div className="w-full h-full flex flex-col items-center overflow-y-scroll-scroll ">
        <PageHeader pageName="پذیرش" />
        <div className="w-9/10 max-w-160 mt-5">
            <ReceptionInputFrom/>
        </div>
    </div>)
}
export default Reception
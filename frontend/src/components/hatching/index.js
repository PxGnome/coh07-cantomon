import Link from "next/link";
import Image from "next/image";  
import CloseButton from "./../../assets/button/close_button_icon.png";
import EggHatching from "./../../assets/hatching/hatching0.png";
import SpeedUpBtnIcon from "./../../assets/button/speedup_button_icon.png";

export default function Hatching() {
    return (
        <div id="cantomon-management-hatching" className="container hatching"> 
            <div className="hatching-window">
                <div className="window-header">
                    <Link href={"/cantomon-management"} >
                        <Image src={CloseButton} alt="close button" />
                    </Link>
                </div>
                <div className="window-body">
                    <div className="image-container">
                        <div className="image-wrapper">
                            <Image src={EggHatching} alt="egg hatching" />
                        </div>
                    </div>
                    <div className="progress-container">
                        <div className="progress">
                        <div class="progress-bar" role="progressbar" aria-label="Progress" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">EST 1 hours 30 minues to hatch ...</div>
                        </div>
                    </div>
                    <div className="action-btn-container">
                        <Link href={"#"} >
                            <Image src={SpeedUpBtnIcon} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
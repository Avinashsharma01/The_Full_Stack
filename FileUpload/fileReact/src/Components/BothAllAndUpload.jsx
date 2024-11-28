import AllImages from "./AllImages";
import Upload from "./Upload";

const BothAllAndUpload = () => {
    return (
        <div className="bg-slate-600 w-full h-auto min-h-screen flex justify-center items-center flex-col">
            <Upload />
            <AllImages />
        </div>
    );
};

export default BothAllAndUpload;

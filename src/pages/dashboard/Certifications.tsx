const Certifications = () => {
  return (
    <div className="bg-white rounded-[10px] p-3 border-[3.5px] border-[#EFEFEF]">
      <div>
        <div className="border border-[#F7F8FA] rounded-[10px]">
          <div className="bg-[#F7F8FA] rounded-t-[10px] text-[#6D6D6D] font-semibold text-[21px] p-2">
            You’re <span className="text-primary"> 68 days </span> away from
            being certified.
          </div>
          <div className="bg-white p-2">
            <div className="flex justify-center gap-2 bg-[#F7F8FA] rounded-[10px] border border-[#ECECEC] py-2 py-6">
              <img src="/svg/certificate4.svg" alt="" className="w-[374px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;

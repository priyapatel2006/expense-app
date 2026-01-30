const Header = () => {
    return (<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
                <img src="/images/logo.png" className="w-14 h-14" />                        </div>
            <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">Financial Overview</h1>
                <p className="text-[#5e8a8d] text-sm">Detailed transaction management and high-level metrics.</p>
            </div>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#dae6e7] shadow-sm">
            <div className="text-right">
                <p className="text-sm text-black font-semibold">Alex Rivera</p>
                <p className="text-[10px] text-[#5e8a8d] uppercase tracking-wide">Premium Member</p>
            </div>
            <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYBXZ_dYs5w6_AhJRlULTyiOOJEb3DjnMV-MszkXQZtwil5i1dDA-pQM8y532tH7PtDZ9KakLVNZzPHWkeLBA7K20A_fQcxBMTZCbi1KIQs85Fu-5HWh6-IVs9S7kzs0n0t8lrK70hzoy6G9GS6JVCRxwXhHOkS_Ji91g8eNWD8CJo85dX2qGh9Y85tLx3eo3iK9EpTWwwBrzIuOhyVLLNVxlzSMjk9HNVcLJmaCpkkaJUQa4uwjjyh1nbOGt2lp8qx2z8IcfAR62Y')" }}></div>
        </div>
    </div>)
}

export default Header;
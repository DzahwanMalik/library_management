const Stat = () => {
  return (
    <div className="w-full text-center stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">Total Buku</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc">Dimiliki</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Buku</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">Sedang Dipinjam</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Anggota</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">Terdaftar</div>
      </div>
    </div>
  );
};

export default Stat;

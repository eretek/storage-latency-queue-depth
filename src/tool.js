/*! Eretek Online Araçlar #47 — Depolama Gecikmesi ve Kuyruk Derinliği */
ERT.def('47', {
	run: function (v, c) {
		var g = [v.iops, v.lat, v.qd].filter(function (x) { return x !== null && x !== undefined; }).length;
		if (g < 2) { throw c.fe('iops', 'two'); }
		var iops = v.iops, lat = v.lat, qd = v.qd, out = 'ok';
		if (g === 3) { var q = iops * lat / 1000; if (Math.abs(q - qd) / Math.max(qd, 1e-9) > 0.02) { throw c.fe('qd', 'inconsistent', { x: c.n(q, 2) }); } }
		if (qd === null || qd === undefined) { qd = iops * lat / 1000; out = 'qd'; }
		else if (iops === null || iops === undefined) { iops = qd / (lat / 1000); out = 'iops'; }
		else { lat = qd / iops * 1000; out = 'lat'; }
		var msgs = [['info', c.t('little')]];
		if (lat > 20) { msgs.push(['warn', c.t('highLat')]); }
		return { big: c.t('r_' + out, { v: out === 'qd' ? c.n(qd, 2) : (out === 'iops' ? c.n(iops, 0) : c.n(lat, 3) + ' ms') }), kv: [['IOPS', c.n(iops, 1)], [c.t('lat'), c.n(lat, 3) + ' ms'], [c.t('qd'), c.n(qd, 2)]], msgs: msgs, v: { iops: Math.round(iops * 1000) / 1000, lat: Math.round(lat * 1e6) / 1e6, qd: Math.round(qd * 1e6) / 1e6 } };
	}
});

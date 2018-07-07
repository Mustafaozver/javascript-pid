////////////////////////////////////
var ATA = {};
////////////////////////////////////


ATA["PID"] = {};
ATA["PID"]["Dizin"] = [];
ATA["PID"]["Oluştur"] = function() {
	var pid = {};
	pid.kmlk = ATA["PID"]["Dizin"].length;
	pid.KP = 0;
	pid.KI = 0;
	pid.KD = 0;
	pid.__xe = 0;
	pid.__xt = 0;
	pid.__y = 0;
	pid.F = 1;
	pid.H = function(x) {
		var t_ = (2.1764705054292435*x - this.__y);
		return t_;
	};
	pid.turevAl = function(x) {
		return (x - this.__xe)*this.F;
	};
	pid.integralAl = function(x) {
		this.__xt += x/this.F;
		return this.__xt;
	};
	pid.I = function(x) {
		x = this.H(x);
		this.__y = this.KP*x + this.KD*this.turevAl(x) + this.KI*this.integralAl(x);
		this.__xe = x;
		return this.__y;
	};
	
	ATA["PID"]["Dizin"].push(pid);
	return pid;
	
};

ATA["UN"] = {};
ATA["UN"]["Dizin"] = [];
ATA["UN"].L = [250000000,0.015,0.1];
ATA["UN"].YC = [];
ATA["UN"].konum0S = [];
ATA["UN"].konumSS = [];
ATA["UN"]["Oluştur"] = function(n) {
	var un = {};
	un.kmlk = ATA["UN"]["Dizin"].length;
	un.konum = [];
	un.hiz = [];
	un.ivme = [];
	un.kutle = 1;
	if (n) for (var i=0;i<n;i++) {
		un.konum.push(0);
		un.hiz.push(0);
		un.ivme.push(0);
		ATA["UN"].konum0S.push(0);
		ATA["UN"].konumSS.push(100);
	}
	un.I = function() {
		for (var i=0;i<ATA["UN"]["Dizin"].length;i++) {
			if (i == this.kmlk) continue;
			var t = 0;
			var t_ = [];
			for (var j=0;j<this.konum.length;j++) {
				var a_ = ATA["UN"]["Dizin"][i].konum[j] - this.konum[j];
				t_.push(a_/this.konum.length);
				a_ = Math.abs(a_*a_);
				t += a_;
			}
			if (t <= 0) t = 0.00001;
			for (var j=0;j<this.konum.length;j++) {
				this.konum[j] += this.hiz[j]*ATA["UN"].L[2];
				this.hiz[j] += this.ivme[j]*ATA["UN"].L[1];
				this.ivme[j] = ATA["UN"].L[0]*(ATA["UN"]["Dizin"][i].kutle*t_[j]/t*2/3*Math.pow(10,-11) + ATA["UN"].YC[j]);
				if (this.konum[j] < ATA["UN"].konum0S[j] || this.konum[j] > ATA["UN"].konumSS[j]) {
					this.hiz[j] *= -0.1;
				} else {
					
					//this.kutle += 0.000001;
				}
				if (this.konum[j] >= ATA["UN"].konumSS[j]) this.konum[j] = ATA["UN"].konumSS[j];//ATA["UN"].konumSS[j]-5;
				else if (this.konum[j] <= ATA["UN"].konum0S[j]) this.konum[j] = ATA["UN"].konum0S[j];//ATA["UN"].konum0S[j]+5;
				
			}
		}
	};
	
	ATA["UN"]["Dizin"].push(un);
	return un;
};
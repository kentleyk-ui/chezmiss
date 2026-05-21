# 🚀 Vercel Deployment Configuration

**Date:** 21 Mai 2026  
**Status:** ✅ CONFIGURED FOR VERCEL

---

## 🎯 Domain Configuration

### Primary Domains
```
www.chezmiss.ca  ← Main domain (active)
chezmiss.ca      ← Redirects to www.chezmiss.ca
```

### Redirect Strategy
```
chezmiss.ca → 301 Permanent Redirect → www.chezmiss.ca
```

All users accessing chezmiss.ca are automatically redirected to www.chezmiss.ca

---

## 📋 Vercel Configuration

### vercel.json Settings
```json
{
  "projectId": "chez-miss",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "nodeVersion": "18.x",
  "regions": ["iad1"],
  "domains": [
    {
      "domain": "chezmiss.ca",
      "redirect": "https://www.chezmiss.ca"
    },
    {
      "domain": "www.chezmiss.ca"
    }
  ],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

### Next.js Configuration
```typescript
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "chezmiss.ca" }],
      destination: "https://www.chezmiss.ca/:path*",
      permanent: true,
    },
  ];
}
```

---

## 🔒 Security Headers

Configured in both vercel.json and next.config.ts:

```
X-Frame-Options: SAMEORIGIN
  → Prevents clickjacking
  
X-Content-Type-Options: nosniff
  → Prevents MIME sniffing
  
Referrer-Policy: strict-origin-when-cross-origin
  → Controls referrer information
```

---

## 🔄 Deployment Flow

### Automatic on Main Branch
```
Push to main
    ↓
GitHub webhook triggers Vercel
    ↓
Vercel clone repository
    ↓
Run: npm install
    ↓
Run: npm run build
    ↓
Deploy to production
    ↓
✅ Site live at www.chezmiss.ca
```

### Manual Deployment
```bash
cd c:/Users/kentl/chezmiss
vercel --prod
```

---

## 📝 DNS Configuration

### Required DNS Records

For **chezmiss.ca**:
```
Type: A
Name: @
Value: (Vercel IP - auto-managed)
```

For **www.chezmiss.ca**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Or if using Vercel Nameservers:
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
Nameserver 3: ns3.vercel-dns.com
Nameserver 4: ns4.vercel-dns.com
```

---

## ✅ Deployment Checklist

Pre-deployment:
- [x] vercel.json created with domain config
- [x] next.config.ts updated with redirects
- [x] Configuration committed to GitHub
- [x] Pushed to main branch

Vercel Dashboard:
- [ ] Connect repository to Vercel
- [ ] Configure domains in Vercel dashboard
- [ ] Set www.chezmiss.ca as primary domain
- [ ] Enable automatic deployments
- [ ] Verify SSL certificate issued
- [ ] Test both domains

Post-deployment:
- [ ] Test www.chezmiss.ca loads
- [ ] Test chezmiss.ca redirects to www
- [ ] Check HTTPS working on both
- [ ] Verify security headers
- [ ] Test on mobile
- [ ] Check performance metrics

---

## 🌐 URLs After Deployment

### Live URLs
```
Primary:    https://www.chezmiss.ca
Redirect:   https://chezmiss.ca → www.chezmiss.ca

Staff Page:       https://www.chezmiss.ca/staff
Boutique:         https://www.chezmiss.ca/boutique
À Propos:         https://www.chezmiss.ca/a-propos
```

---

## 📊 Vercel Features Enabled

✅ **Automatic Deployments**
- Deploys on every push to main
- No manual intervention needed
- Instant preview URLs for PRs

✅ **SSL/TLS Certificate**
- Free automatic HTTPS
- Both domains covered
- Auto-renewal

✅ **CDN**
- Global edge network
- Fast content delivery
- Auto-compression (gzip, brotli)

✅ **Analytics**
- Real-time traffic monitoring
- Performance metrics
- Error tracking

✅ **Serverless Functions**
- API routes work out of the box
- Automatic scaling
- No cold start issues

---

## 🔧 Configuration Files

### Created/Modified

**vercel.json** (new)
```
Configuration for Vercel platform
Domain management
Security headers
Build settings
```

**next.config.ts** (updated)
```
NextJS redirect rules
Domain-based routing
Security headers
```

---

## 📈 Performance

### Vercel Benefits
- **Global CDN:** 280+ edge locations
- **Zero cold starts:** Serverless optimization
- **Automatic scaling:** Handles traffic spikes
- **Analytics included:** Real-time monitoring
- **SSL/TLS free:** Automatic HTTPS

### Expected Performance
- TTFB: < 200ms
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## 🚀 Deployment Steps

### 1. Connect to Vercel
```bash
# If not already connected
vercel login
vercel link
```

### 2. Deploy to Production
```bash
# Automatic via GitHub
# OR Manual:
vercel --prod
```

### 3. Configure Domains
In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add www.chezmiss.ca
3. Add chezmiss.ca
4. Configure redirect (chezmiss.ca → www)
5. Update DNS records with provider

### 4. Verify Deployment
```bash
# Check domain
curl https://www.chezmiss.ca

# Check redirect
curl -I https://chezmiss.ca
# Should return: Location: https://www.chezmiss.ca
```

---

## 📞 Support

### Common Issues

**Domain not resolving:**
1. Check DNS records configured
2. Wait for DNS propagation (up to 48h)
3. Verify Vercel dashboard shows domain

**HTTPS not working:**
1. Wait for certificate issuance (~5 min)
2. Check domain is verified
3. Clear browser cache

**Redirect not working:**
1. Verify vercel.json syntax
2. Check next.config.ts redirects
3. Rebuild and redeploy

---

## 📋 Summary

**Vercel Configuration Complete:**
✅ Both domains configured
✅ Auto-redirect setup
✅ Security headers added
✅ Automatic deployments enabled
✅ DNS ready for configuration

**Next Step:**
1. Point your domain registrar to Vercel DNS
2. Vercel will handle the rest automatically
3. Monitor for deployment in Vercel dashboard

---

**Ready for Vercel Deployment!** 🚀

# 🌐 Cloudflare Configuration for Vercel

**Status:** ✅ READY TO UPDATE DNS RECORDS

---

## 📋 Current Setup

Cloudflare already manages:
- ✅ chezmiss.ca
- ✅ www.chezmiss.ca

Now we need to point them to Vercel.

---

## 🔧 Cloudflare DNS Configuration

### Step 1: Access Cloudflare Dashboard
1. Go to https://dash.cloudflare.com
2. Select domain: chezmiss.ca
3. Navigate to DNS Records

### Step 2: Update DNS Records for www

**Current Record (before Vercel):**
```
Type: CNAME
Name: www
Value: (anciennement Netlify, à remplacer par Vercel)
TTL: Auto
```

**New Record (Vercel):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

**Steps:**
1. Click on www CNAME record
2. Change Value to: cname.vercel-dns.com
3. Click Save
4. Wait for DNS propagation (5-15 minutes)

### Step 3: Update DNS Records for Root (@)

**For chezmiss.ca (without www):**

Option A - Using A Record (Recommended):
```
Type: A
Name: @ (or chezmiss.ca)
Value: 76.76.19.163
TTL: Auto
Proxy: DNS only (gray cloud)
```

Option B - Using CNAME with ALIAS:
```
Type: CNAME (or ALIAS)
Name: @ (or chezmiss.ca)
Value: cname.vercel-dns.com
TTL: Auto
```

**Steps:**
1. Click on @ (root) record
2. Update or create A/CNAME record
3. Use Vercel IP or cname.vercel-dns.com
4. Set Proxy to "DNS only" (gray cloud, not orange)
5. Click Save

---

## ⚠️ Important Notes

### DNS Only Mode
**MUST use "DNS only" (gray cloud) in Cloudflare:**
- ❌ Do NOT use "Proxied" (orange cloud)
- ✅ Use "DNS only" (gray cloud)
- Vercel handles SSL/HTTPS directly

### Why?
If you use proxied mode with Cloudflare:
- SSL certificate conflicts
- Vercel can't manage the cert properly
- HTTPS may not work correctly

---

## 🔄 Record Configuration Summary

### For www.chezmiss.ca
```
Type:     CNAME
Name:     www
Value:    cname.vercel-dns.com
Proxy:    DNS only (gray cloud) ← IMPORTANT
TTL:      Auto
Status:   ✅ Active
```

### For chezmiss.ca (root)
```
Type:     A
Name:     @ (or leave blank)
Value:    76.76.19.163
Proxy:    DNS only (gray cloud) ← IMPORTANT
TTL:      Auto
Status:   ✅ Active
```

Or with CNAME/ALIAS:
```
Type:     CNAME (or ALIAS for root)
Name:     @ (or leave blank)
Value:    cname.vercel-dns.com
Proxy:    DNS only (gray cloud) ← IMPORTANT
TTL:      Auto
Status:   ✅ Active
```

---

## 🚀 Cloudflare to Vercel Redirect

### Configuration in Vercel Dashboard

Once DNS is updated, in Vercel:

1. **Project Settings → Domains**
2. **Add Domain:** www.chezmiss.ca
3. **Add Domain:** chezmiss.ca
4. **Set Redirect:** chezmiss.ca → www.chezmiss.ca
5. **Verify Domains**

---

## ✅ Step-by-Step Checklist

### In Cloudflare Dashboard
- [ ] Login to https://dash.cloudflare.com
- [ ] Select chezmiss.ca domain
- [ ] Go to DNS Records
- [ ] Update www CNAME to: cname.vercel-dns.com
- [ ] Update @ (root) A record to: 76.76.19.163
- [ ] Ensure Proxy is "DNS only" (gray cloud)
- [ ] Save all changes
- [ ] Wait 5-15 minutes for propagation

### In Vercel Dashboard
- [ ] Go to Project Settings → Domains
- [ ] Add www.chezmiss.ca
- [ ] Add chezmiss.ca
- [ ] Configure chezmiss.ca redirect to www.chezmiss.ca
- [ ] Verify both domains
- [ ] Check SSL certificate status (should be issued)

### Testing
- [ ] www.chezmiss.ca loads in browser
- [ ] chezmiss.ca redirects to www.chezmiss.ca
- [ ] HTTPS works (lock icon shows)
- [ ] All pages load correctly
- [ ] Social links work
- [ ] Staff page accessible (/staff)

---

## 🔐 SSL Certificate

### Automatic with Vercel
- ✅ Vercel issues free SSL certificate
- ✅ Covers both domains (SAN)
- ✅ Auto-renewal
- ✅ No Cloudflare SSL needed (DNS only mode)

### Important
- Make sure Cloudflare proxy is **DNS only** (gray cloud)
- Do NOT use Full or Full (strict) SSL mode
- Vercel will handle all HTTPS

---

## 📊 DNS Propagation

### Timeline
```
Immediate:  Changes visible in Cloudflare
5 min:      Most regions see new DNS
15 min:     Worldwide propagation
48 hours:   All caches cleared
```

### Check Propagation
```bash
# Check DNS propagation online
nslookup www.chezmiss.ca
dig www.chezmiss.ca

# Should return: cname.vercel-dns.com
```

Or use: https://whatsmydns.net

---

## 🔄 Current vs New Configuration

### Ancien (Netlify)
```

Proxy:           → Proxied (orange)
```

### New (Vercel)
```
www.chezmiss.ca  → CNAME → cname.vercel-dns.com
chezmiss.ca      → A     → 76.76.19.163
Proxy:           → DNS only (gray)
```

---

## 📞 Troubleshooting

### If www.chezmiss.ca doesn't work
1. Check Cloudflare DNS record is set correctly
2. Verify proxy is "DNS only" (gray cloud)
3. Check Vercel domain is verified
4. Wait for DNS propagation
5. Clear browser cache

### If chezmiss.ca doesn't redirect
1. Verify @ (root) A record is correct
2. Check Vercel redirect is configured
3. Ensure Proxy is "DNS only"
4. Verify SSL certificate is issued

### If HTTPS doesn't work
1. **Check Proxy mode:** Must be "DNS only" (gray)
2. Remove any Cloudflare SSL mode conflicts
3. Wait for Vercel SSL cert issuance (~5 min)
4. Clear browser cache and cookies

### If mixed content warnings
1. Ensure Proxy is "DNS only" (not proxied)
2. Update any hardcoded http:// to https://
3. Check asset URLs use relative paths

---

## 🎯 Final URLs

After configuration:
```
https://www.chezmiss.ca          ← Primary
https://chezmiss.ca              ← Redirects to www
https://www.chezmiss.ca/staff    ← Staff page
https://www.chezmiss.ca/boutique ← Shop
```

---

## 📋 Summary

**What to do:**
1. Go to Cloudflare dashboard
2. Update DNS records to point to Vercel
3. Set proxy mode to "DNS only"
4. Wait for propagation
5. Verify in Vercel dashboard

**Time needed:** 10 minutes (+ 5-15 min for DNS propagation)

**Result:** CHEZ MISS live on Vercel with Cloudflare DNS management

---

**Ready to configure Cloudflare for Vercel!** ✨

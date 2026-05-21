# ⚡ Quick Cloudflare Setup for Vercel

**Time needed:** 5-10 minutes

---

## 🔑 Key DNS Records

### www.chezmiss.ca
```
Type:   CNAME
Value:  cname.vercel-dns.com
Proxy:  DNS only (gray cloud) ⚠️ IMPORTANT
```

### chezmiss.ca (root)
```
Type:   A
Value:  76.76.19.163
Proxy:  DNS only (gray cloud) ⚠️ IMPORTANT
```

---

## 🚀 5-Step Process

### 1️⃣ Open Cloudflare
Go to: https://dash.cloudflare.com → chezmiss.ca → DNS

### 2️⃣ Update www Record
- Find: www CNAME record
- Change to: cname.vercel-dns.com
- Proxy: DNS only (gray cloud)
- Save

### 3️⃣ Update Root Record
- Find: @ (root) A record
- Change to: 76.76.19.163
- Proxy: DNS only (gray cloud)
- Save

### 4️⃣ Wait for Propagation
- Check: 5-15 minutes for worldwide DNS update

### 5️⃣ Verify in Vercel
- Go to: Project Settings → Domains
- Add: www.chezmiss.ca
- Add: chezmiss.ca
- Verify both domains

---

## ⚠️ Critical Setting

**MUST be "DNS only" (gray cloud):**
- ✅ Gray cloud = DNS only
- ❌ Orange cloud = Proxied (causes issues)

Why? Vercel handles HTTPS directly.

---

## ✅ Test After Setup

```bash
# Check DNS pointing to Vercel
nslookup www.chezmiss.ca

# Should show:
# www.chezmiss.ca CNAME cname.vercel-dns.com
```

Or visit: https://whatsmydns.net

---

## 🎯 After DNS Updates

**Homepage:** https://www.chezmiss.ca
**Redirects:** https://chezmiss.ca → www.chezmiss.ca
**Staff:** https://www.chezmiss.ca/staff

---

**That's it!** 🎉

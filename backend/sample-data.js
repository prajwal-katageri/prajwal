// In-memory sample data derived from the current frontend HTML.
// Replace this with a real DB later (Postgres/MySQL/etc.).

const nowIso = new Date().toISOString();

module.exports = {
  meta: {
    generatedAt: nowIso,
    business: {
      id: "biz_001",
      name: "Sharma Clinic & Store",
      type: "Clinic + Shop",
      location: "Kunigal, Karnataka"
    },
    user: {
      id: "user_001",
      displayName: "Dr. Sharma",
      initials: "SK"
    }
  },

  dashboard: {
    greeting: {
      title: "Good morning, Dr. Sharma",
      subtitle: "Saturday, 14 March 2026 · Sharma Clinic & Store · Kunigal, Karnataka"
    },
    stats: {
      todaysRevenueInr: 124200,
      appointmentsToday: 38,
      itemsInStock: 847,
      avgRating: 4.7,
      deltas: {
        revenuePctVsYesterday: 12.4,
        appointmentsMoreThanUsual: 5,
        lowStockAlerts: 3,
        ratingThisMonth: 0.2
      }
    },
    weeklyRevenue: {
      currency: "INR",
      unit: "K",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [82, 94, 105, 142, 118, 124, 79],
      totalWeek: 684,
      bestDay: { day: "Thu", value: 142 },
      avgPerDay: 97.7
    },
    revenueMix: {
      currency: "INR",
      clinic: 424000,
      pharmacy: 147000,
      shop: 84000,
      other: 29000,
      clinicPct: 62
    }
  },

  appointments: {
    todaySummary: [
      { id: "appt_001", patient: "Rajesh Kumar", time: "09:00 AM", doctor: "Dr. Sharma", status: "Done" },
      { id: "appt_002", patient: "Priya Nair", time: "10:30 AM", doctor: "Dr. Sharma", status: "Current" },
      { id: "appt_003", patient: "Arun Gowda", time: "11:00 AM", doctor: "Dr. Sharma", status: "Waiting" },
      { id: "appt_004", patient: "Sunita Reddy", time: "02:00 PM", doctor: "Dr. Ravi", status: "Waiting" },
      { id: "appt_005", patient: "Mohan Das", time: "03:30 PM", doctor: "Dr. Ravi", status: "Scheduled" }
    ],
    queue: [
      { id: "q_001", time: "9:00", patient: "Rajesh Kumar", meta: "General · Dr. Sharma · OP#12", status: "Done" },
      { id: "q_002", time: "10:30", patient: "Priya Nair", meta: "Diabetes follow-up · Dr. Sharma", status: "In Progress" },
      { id: "q_003", time: "11:00", patient: "Arun Gowda", meta: "BP Check · Dr. Sharma", status: "Waiting" },
      { id: "q_004", time: "2:00", patient: "Sunita Reddy", meta: "New Patient · Dr. Ravi", status: "Scheduled" },
      { id: "q_005", time: "3:30", patient: "Mohan Das", meta: "Post-op review · Dr. Ravi", status: "Scheduled" }
    ],
    doctors: [
      {
        id: "doc_001",
        name: "Dr. Sharma",
        status: "Available",
        specialties: "General Medicine, Diabetology",
        today: "9:00 AM – 2:00 PM",
        patientsSeen: 22
      },
      {
        id: "doc_002",
        name: "Dr. Ravi",
        status: "In Session",
        specialties: "Surgery, Orthopaedics",
        today: "2:00 PM – 7:00 PM",
        note: "Starts in 3 hrs"
      }
    ]
  },

  transactions: {
    recent: [
      { invoice: "INV-2024-891", amountInr: 2400, status: "Paid" },
      { invoice: "INV-2024-890", amountInr: 850, status: "Paid" },
      { invoice: "INV-2024-889", amountInr: 5200, status: "Pending" },
      { invoice: "INV-2024-888", amountInr: 1100, status: "Paid" },
      { invoice: "INV-2024-887", amountInr: 3600, status: "Overdue" }
    ]
  },

  inventory: {
    lowStockAlerts: 3,
    items: [
      { id: "inv_001", name: "Paracetamol 500mg", category: "Medicine", stock: "1240 tabs", levelPct: 80, unitPriceInr: 2.5, supplier: "MedPharma", status: "In Stock" },
      { id: "inv_002", name: "Amoxicillin 250mg", category: "Medicine", stock: "18 strips", levelPct: 12, unitPriceInr: 68.0, supplier: "HealthPlus", status: "Low Stock" },
      { id: "inv_003", name: "BP Monitor", category: "Equipment", stock: "4 units", levelPct: 30, unitPriceInr: 1800, supplier: "MedEquip Co.", status: "Low" },
      { id: "inv_004", name: "Dolo 650mg", category: "Medicine", stock: "560 tabs", levelPct: 65, unitPriceInr: 4.2, supplier: "MedPharma", status: "In Stock" },
      { id: "inv_005", name: "Surgical Gloves (L)", category: "Equipment", stock: "8 boxes", levelPct: 20, unitPriceInr: 220, supplier: "SafeMed", status: "Low Stock" },
      { id: "inv_006", name: "Metformin 500mg", category: "Medicine", stock: "340 tabs", levelPct: 55, unitPriceInr: 3.8, supplier: "DiabCare", status: "In Stock" },
      { id: "inv_007", name: "Thermometer Digital", category: "Equipment", stock: "12 units", levelPct: 70, unitPriceInr: 380, supplier: "MedEquip Co.", status: "In Stock" },
      { id: "inv_008", name: "Azithromycin 500mg", category: "Medicine", stock: "11 strips", levelPct: 9, unitPriceInr: 85.0, supplier: "HealthPlus", status: "Low Stock" }
    ]
  },

  billing: {
    summary: {
      todaysSalesInr: 124200,
      todaysTransactions: 47,
      todaysGstInr: 11160,
      pendingPaymentsInr: 18500,
      pendingInvoicesCount: 5,
      monthlyRevenueInr: 3460000,
      monthlyRevenueDeltaPct: 12
    },
    invoices: [
      { id: "INV-2024-891", customer: "Rajesh Kumar", date: "14 Mar 2026", amountInr: 2400, taxInr: 216, payment: "UPI", status: "Paid" },
      { id: "INV-2024-890", customer: "Priya Nair", date: "14 Mar 2026", amountInr: 850, taxInr: 76, payment: "Cash", status: "Paid" },
      { id: "INV-2024-889", customer: "Arun Gowda", date: "13 Mar 2026", amountInr: 5200, taxInr: 468, payment: "—", status: "Pending" },
      { id: "INV-2024-888", customer: "Sunita Reddy", date: "13 Mar 2026", amountInr: 1100, taxInr: 99, payment: "Card", status: "Paid" },
      { id: "INV-2024-887", customer: "Retail — Walk-in", date: "12 Mar 2026", amountInr: 3600, taxInr: 324, payment: "—", status: "Overdue" },
      { id: "INV-2024-886", customer: "Mohan Das", date: "12 Mar 2026", amountInr: 680, taxInr: 61, payment: "UPI", status: "Paid" }
    ]
  },

  customers: {
    total: 248,
    list: [
      { id: "cust_001", name: "Rajesh Kumar", phone: "+91 98765 43210", visits: 24, totalSpentInr: 42000, loyaltyPoints: 1840, progressPct: 80, segment: "Premium" },
      { id: "cust_002", name: "Priya Nair", phone: "+91 87654 32109", visits: 11, totalSpentInr: 18500, loyaltyPoints: 740, progressPct: 45, segment: "Regular" },
      { id: "cust_003", name: "Arun Gowda", phone: "+91 76543 21098", visits: 6, totalSpentInr: 9200, loyaltyPoints: 368, progressPct: 25, segment: "Regular" },
      { id: "cust_004", name: "Sunita Reddy", phone: "+91 65432 10987", visits: 2, totalSpentInr: 2400, loyaltyPoints: 96, progressPct: 8, segment: "New" },
      { id: "cust_005", name: "Mohan Das", phone: "+91 54321 09876", visits: 38, totalSpentInr: 78000, loyaltyPoints: 3120, progressPct: 100, segment: "Premium" },
      { id: "cust_006", name: "Kavitha Rao", phone: "+91 43210 98765", visits: 15, totalSpentInr: 22000, loyaltyPoints: 880, progressPct: 55, segment: "Regular" }
    ]
  },

  feedback: {
    overall: { rating: 4.7, reviewsCount: 324 },
    breakdown: {
      "5": 241,
      "4": 52,
      "3": 20,
      "2": 7,
      "1": 4
    },
    sentiment: {
      positivePct: 78,
      neutralPct: 15,
      negativePct: 7,
      positiveNote: "Great service, friendly staff",
      neutralNote: "Average wait times",
      negativeNote: "Parking, wait time issues"
    },
    reviews: [
      {
        id: "rev_001",
        author: "Rajesh Kumar",
        stars: 5,
        date: "14 Mar 2026",
        text: "Excellent consultation. Dr. Sharma was very thorough and explained everything clearly. The pharmacy had all medicines in stock."
      },
      {
        id: "rev_002",
        author: "Priya Nair",
        stars: 4,
        date: "13 Mar 2026",
        text: "Good service overall. Had to wait a bit but the treatment was effective. Clean and organised clinic."
      },
      {
        id: "rev_003",
        author: "Walk-in Customer",
        stars: 3,
        date: "12 Mar 2026",
        text: "Parking is difficult. The pharmacy staff could be more helpful."
      }
    ]
  },

  prescriptions: {
    recent: [
      {
        id: "RX-2024-147",
        patient: "Priya Nair",
        when: "Today, 10:30 AM",
        diagnosis: "Type 2 Diabetes — follow-up",
        doctor: "Dr. Sharma",
        medicines: [
          { name: "Metformin 500mg", dose: "1-0-1 · 30 days" },
          { name: "Glimepiride 2mg", dose: "1-0-0 · 30 days" },
          { name: "Vitamin D3 60K IU", dose: "1 weekly · 8 weeks" }
        ]
      },
      {
        id: "RX-2024-146",
        patient: "Rajesh Kumar",
        when: "Today, 9:00 AM",
        diagnosis: "Acute Fever",
        doctor: "Dr. Sharma",
        medicines: [
          { name: "Dolo 650mg", dose: "1-1-1 · 5 days" },
          { name: "Azithromycin 500mg", dose: "1-0-0 · 3 days" }
        ]
      }
    ],
    medicineList: [
      { name: "Paracetamol 500mg", type: "Tablet", stock: 1240, stockStatus: "In Stock" },
      { name: "Amoxicillin 250mg", type: "Capsule", stock: 18, stockStatus: "Low" },
      { name: "Metformin 500mg", type: "Tablet", stock: 340, stockStatus: "In Stock" },
      { name: "Glimepiride 2mg", type: "Tablet", stock: 280, stockStatus: "In Stock" },
      { name: "Azithromycin 500mg", type: "Tablet", stock: 11, stockStatus: "Low" },
      { name: "Vitamin D3 60K IU", type: "Sachet", stock: 42, stockStatus: "Medium" }
    ]
  },

  notifications: {
    statsToday: {
      whatsappSent: 38,
      smsSent: 24,
      emailsSent: 12,
      pending: 7
    },
    recent: [
      { id: "n_001", channel: "WhatsApp", title: "Invoice sent to Rajesh Kumar", detail: "INV-2024-891 · ₹2,400 · Delivered", time: "10:42 AM" },
      { id: "n_002", channel: "SMS", title: "Appointment reminder — Arun Gowda", detail: "11:00 AM appointment reminder · Delivered", time: "9:45 AM" },
      { id: "n_003", channel: "Internal", title: "Low stock alert — Amoxicillin 250mg", detail: "Only 18 strips remaining · Action needed", time: "9:00 AM" },
      { id: "n_004", channel: "Email", title: "Monthly report emailed", detail: "February 2026 summary report sent to admin", time: "8:00 AM" },
      { id: "n_005", channel: "WhatsApp", title: "Feedback request — Priya Nair", detail: "Post-visit feedback link sent", time: "Yesterday" }
    ]
  },

  analytics: {
    insights: [
      {
        id: "ins_001",
        label: "Predicted Revenue — Next 7 Days",
        value: "₹8.2L",
        trend: "+20% vs last week",
        description: "Based on appointment bookings, seasonal patterns and historical sales data."
      },
      {
        id: "ins_002",
        label: "Inventory Reorder Alert",
        value: "3 Items",
        trend: "Action required",
        description: "Amoxicillin, Azithromycin and Surgical Gloves will run out within 7 days at current usage rate."
      },
      {
        id: "ins_003",
        label: "Peak Hours (This Week)",
        value: "10–12 AM",
        trend: "Tue, Wed, Thu busiest",
        description: "Consider adding one more doctor slot on Tuesday and Wednesday mornings."
      },
      {
        id: "ins_004",
        label: "Customer Retention Score",
        value: "84.2%",
        trend: "+3.1% vs last month",
        description: "High loyalty programme engagement is driving repeat visits. 38 premium customers active."
      }
    ],
    forecast: {
      days: 30,
      values: [95, 102, 88, 115, 124, 108, 132, 119, 140, 128, 145, 138, 122, 130, 148, 135, 152, 144, 158, 150, 162, 155, 170, 162, 168, 175, 180, 172, 185, 190]
    },
    topSellingProducts: [
      { name: "Paracetamol 500mg", unitsPerWeek: 480, trendPct: 8 },
      { name: "Dolo 650mg", unitsPerWeek: 320, trendPct: 15 },
      { name: "Metformin 500mg", unitsPerWeek: 210, trendPct: 4 },
      { name: "Azithromycin 500mg", unitsPerWeek: 140, trendPct: 22 },
      { name: "BP Monitor", unitsPerWeek: 12, trendPct: -3 }
    ],
    feedbackThemes: [
      { theme: "Friendly staff", delta: 124, polarity: "positive" },
      { theme: "Accurate diagnosis", delta: 98, polarity: "positive" },
      { theme: "Clean clinic", delta: 76, polarity: "positive" },
      { theme: "Wait time", delta: -32, polarity: "neutral" },
      { theme: "Parking", delta: -18, polarity: "negative" },
      { theme: "Medicine available", delta: 54, polarity: "positive" }
    ]
  },

  subscription: {
    current: {
      plan: "Pro",
      nextBillingDate: "1 Apr 2026",
      priceInrPerMonth: 2999,
      autoRenew: true
    },
    plans: [
      {
        id: "starter",
        name: "Starter",
        priceInrPerMonth: 999,
        features: [
          "1 Business domain",
          "Up to 5 users",
          "Basic billing & invoicing",
          "100 WhatsApp messages/mo",
          "Email support"
        ]
      },
      {
        id: "pro",
        name: "Pro",
        priceInrPerMonth: 2999,
        current: true,
        features: [
          "3 Business domains",
          "Up to 25 users",
          "Clinic + Billing + Inventory",
          "1000 WhatsApp messages/mo",
          "AI Analytics (basic)",
          "Priority support"
        ]
      },
      {
        id: "enterprise",
        name: "Enterprise",
        priceInrPerMonth: 7999,
        features: [
          "Unlimited domains",
          "Unlimited users",
          "All features + white-label",
          "Unlimited notifications",
          "Advanced AI Analytics",
          "Dedicated account manager"
        ]
      }
    ]
  },

  admin: {
    monitor: {
      apiResponseTimeMs: 48,
      systemUptimePct: 99.9,
      activeBusinesses: 142,
      dbLoadPct: 34,
      activeUsersNow: 287,
      errors24h: 3
    },
    businesses: [
      { id: "biz_001", name: "Sharma Clinic & Store", type: "Clinic + Shop", plan: "Pro", status: "Active" },
      { id: "biz_002", name: "Raju's Restaurant", type: "Restaurant", plan: "Enterprise", status: "Active" },
      { id: "biz_003", name: "Meena General Store", type: "Shop", plan: "Starter", status: "Trial" },
      { id: "biz_004", name: "City Dental Clinic", type: "Clinic", plan: "Pro", status: "Active" },
      { id: "biz_005", name: "Lakshmi Pharmacy", type: "Pharmacy", plan: "Starter", status: "Expired" }
    ],
    subscriptionMonitoring: {
      active: 118,
      trial: 14,
      expired: 7,
      mrrInr: 424000
    }
  },

  // Used by /api/shops/nearby. Coordinates are approximate.
  shops: [
    {
      id: "shop_001",
      name: "Sharma Clinic & Store",
      address: "Kunigal, Karnataka",
      lat: 13.0236,
      lng: 77.0256
    },
    {
      id: "shop_002",
      name: "City Dental Clinic",
      address: "Tumakuru, Karnataka",
      lat: 13.3392,
      lng: 77.1173
    },
    {
      id: "shop_003",
      name: "Lakshmi Pharmacy",
      address: "Bengaluru, Karnataka",
      lat: 12.9716,
      lng: 77.5946
    },
    {
      id: "shop_004",
      name: "Meena General Store",
      address: "Nelamangala, Karnataka",
      lat: 13.0995,
      lng: 77.3947
    },
    {
      id: "shop_005",
      name: "HealthPlus Partner Pharmacy",
      address: "Mysuru, Karnataka",
      lat: 12.2958,
      lng: 76.6394
    }
  ]
};

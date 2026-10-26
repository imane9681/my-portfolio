const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// إعداد تخزين الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

// جلب جميع المشاريع
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// إضافة مشروع جديد
router.post("/", upload.single('image'), async (req, res) => {
  try {
    let { title, description, category, categories, tags, links, liveLink, githubLink } = req.body;
    
    // معالجة categories (قد تكون JSON string)
    let categoriesArray = [];
    if (categories) {
      try {
        categoriesArray = typeof categories === 'string' ? JSON.parse(categories) : categories;
      } catch (e) {
        categoriesArray = [];
      }
    }
    
    // إذا كان هناك category قديم، أضفه إلى المصفوفة إذا لم يكن موجوداً
    if (category && !categoriesArray.includes(category)) {
      categoriesArray.push(category);
    }
    
    // معالجة tags
    let tagsArray = [];
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }
    
    // معالجة links
    let linksArray = [];
    if (links) {
      try {
        linksArray = typeof links === 'string' ? JSON.parse(links) : links;
      } catch (e) {
        linksArray = [];
      }
    }
    
    // إذا لم تكن هناك links، قم بإنشائها من liveLink و githubLink
    if (linksArray.length === 0) {
      linksArray = [
        { 
          href: liveLink || '#', 
          icon: "/images/external-link.svg", 
          title: "View Live" 
        },
        { 
          href: githubLink || '#', 
          icon: "/images/github.svg", 
          title: "View Code" 
        }
      ];
    }
    
    const projectData = {
      title,
      description,
      category: category || (categoriesArray.length > 0 ? categoriesArray[0] : ''),
      categories: categoriesArray,
      tags: tagsArray,
      liveLink: liveLink || '',
      githubLink: githubLink || '',
      links: linksArray,
      img: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    };

    const project = new Project(projectData);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ message: err.message });
  }
});

// حذف مشروع
router.delete("/:id", async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث مشروع
router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, categories, tags, links, liveLink, githubLink } = req.body;
    
    // معالجة categories
    let categoriesArray = [];
    if (categories) {
      try {
        categoriesArray = typeof categories === 'string' ? JSON.parse(categories) : categories;
      } catch (e) {
        categoriesArray = [];
      }
    }
    
    if (category && !categoriesArray.includes(category)) {
      categoriesArray.push(category);
    }
    
    // معالجة tags
    let tagsArray = [];
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }
    
    // معالجة links
    let linksArray = [];
    if (links) {
      try {
        linksArray = typeof links === 'string' ? JSON.parse(links) : links;
      } catch (e) {
        linksArray = [];
      }
    }
    
    if (linksArray.length === 0) {
      linksArray = [
        { 
          href: liveLink || '#', 
          icon: "/images/external-link.svg", 
          title: "View Live" 
        },
        { 
          href: githubLink || '#', 
          icon: "/images/github.svg", 
          title: "View Code" 
        }
      ];
    }
    
    // بناء كائن التحديث
    const updateData = {
      title,
      description,
      category: category || (categoriesArray.length > 0 ? categoriesArray[0] : ''),
      categories: categoriesArray,
      tags: tagsArray,
      liveLink: liveLink || '',
      githubLink: githubLink || '',
      links: linksArray
    };
    
    // إذا تم رفع صورة جديدة
    if (req.file) {
      updateData.img = `/uploads/${req.file.filename}`;
    }
    
    const updated = await Project.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(updated);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Upload,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar as CalendarIconAlt,
  Globe,
  Linkedin,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { Sparkles } from "@/components/ui/sparkles";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
  noticePeriod: Date | undefined;
  coverLetter: string;
  skills: string[];
  experience: string;
  linkedinUrl: string;
  portfolioUrl: string;
  agreedToTerms: boolean;
}

export const CarrerSecTwo = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    noticePeriod: undefined,
    coverLetter: "",
    skills: [],
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
    agreedToTerms: false,
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "Other",
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      handleInputChange("skills", [...formData.skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange(
      "skills",
      formData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.position &&
      formData.agreedToTerms
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const floatingCard = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseBackground = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.05, 0.1, 0.05],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const successCheckmark = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="pb-20 px-4 relative z-10 overflow-hidden bg-white to-blue-50">
       <Sparkles
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={50}
        particleColor="#3b82f6"
        speed={0.5}
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={fadeInUp}>
            <motion.p
              className="text-gray-600 text-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Apply for your dream position and we&apos;ll get back to you soon.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div className="relative" variants={fadeInUp}>
                <motion.div
                  className="absolute inset-0 bg-blue-100/20 rounded-xl pointer-events-none"
                  variants={pulseBackground}
                  initial="hidden"
                  animate="visible"
                />

                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Personal Information Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <User className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Personal Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="firstName"
                            className="text-gray-700 mb-2 block"
                          >
                            First Name *
                          </Label>
                          <div className="relative">
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="lastName"
                            className="text-gray-700 mb-2 block"
                          >
                            Last Name *
                          </Label>
                          <div className="relative">
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Contact Details Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.1 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Contact Details
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="email"
                            className="text-gray-700 mb-2 block"
                          >
                            Email *
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="phone"
                            className="text-gray-700 mb-2 block"
                          >
                            Phone *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Position & Resume Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.2 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <Briefcase className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Position & Resume
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="position"
                            className="text-gray-700 mb-2 block"
                          >
                            Position *
                          </Label>
                          <div className="relative">
                            <Select
                              value={formData.position}
                              onValueChange={(value) =>
                                handleInputChange("position", value)
                              }
                            >
                              <SelectTrigger className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all">
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200">
                                {positions.map((position) => (
                                  <SelectItem
                                    key={position}
                                    value={position}
                                    className="hover:bg-blue-50"
                                  >
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="noticePeriod"
                            className="text-gray-700 mb-2 block"
                          >
                            Notice Period
                          </Label>
                          <div className="relative">
                            <Popover
                              open={isCalendarOpen}
                              onOpenChange={setIsCalendarOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all justify-start"
                                >
                                  {formData.noticePeriod
                                    ? format(formData.noticePeriod, "PPP")
                                    : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white border border-gray-200">
                                <Calendar
                                  mode="single"
                                  selected={formData.noticePeriod}
                                  onSelect={(date) => {
                                    handleInputChange("noticePeriod", date);
                                    setIsCalendarOpen(false);
                                  }}
                                  initialFocus
                                  className="bg-white"
                                />
                              </PopoverContent>
                            </Popover>
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Label
                          htmlFor="resume"
                          className="text-gray-700 mb-2 block"
                        >
                          Resume/CV *
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                              {formData.resume
                                ? formData.resume.name
                                : "Click to upload your resume"}
                            </p>
                            <p className="text-xs text-gray-400">
                              PDF, DOC, DOCX (max 5MB)
                            </p>
                            <Input
                              id="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("resume")?.click()
                              }
                              className="mt-2"
                            >
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Cover Letter Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.3 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Cover Letter
                        </h3>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Label
                          htmlFor="coverLetter"
                          className="text-gray-700 mb-2 block"
                        >
                          Tell us why you&apos;re a great fit
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="coverLetter"
                            value={formData.coverLetter}
                            onChange={(e) =>
                              handleInputChange("coverLetter", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all min-h-[150px]"
                          />
                          <FileText className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Skills & Experience Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.4 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <CalendarIconAlt className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Skills & Experience
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="skills"
                            className="text-gray-700 mb-2 block"
                          >
                            Your Skills
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="skills"
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              placeholder="Add a skill (e.g., React, Node.js)"
                              className="flex-1 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addSkill())
                              }
                            />
                            <Button
                              type="button"
                              onClick={addSkill}
                              variant="outline"
                            >
                              Add
                            </Button>
                          </div>

                          {formData.skills.length > 0 && (
                            <motion.div
                              className="flex flex-wrap gap-2 mt-3"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              {formData.skills.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge className="bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
                                    {skill}
                                    <X
                                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                                      onClick={() => removeSkill(skill)}
                                    />
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="experience"
                            className="text-gray-700 mb-2 block"
                          >
                            Experience Level *
                          </Label>
                          <div className="relative">
                            <Select
                              value={formData.experience}
                              onValueChange={(value) =>
                                handleInputChange("experience", value)
                              }
                            >
                              <SelectTrigger className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200">
                                <SelectItem
                                  value="0-1"
                                  className="hover:bg-blue-50"
                                >
                                  0-1 years
                                </SelectItem>
                                <SelectItem
                                  value="1-3"
                                  className="hover:bg-blue-50"
                                >
                                  1-3 years
                                </SelectItem>
                                <SelectItem
                                  value="3-5"
                                  className="hover:bg-blue-50"
                                >
                                  3-5 years
                                </SelectItem>
                                <SelectItem
                                  value="5-10"
                                  className="hover:bg-blue-50"
                                >
                                  5-10 years
                                </SelectItem>
                                <SelectItem
                                  value="10+"
                                  className="hover:bg-blue-50"
                                >
                                  10+ years
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <CalendarIconAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Professional Links Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.5 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <div className="flex items-center gap-2 mb-6">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Professional Links
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="linkedin"
                            className="text-gray-700 mb-2 block"
                          >
                            LinkedIn
                          </Label>
                          <div className="relative">
                            <Input
                              id="linkedin"
                              value={formData.linkedinUrl}
                              onChange={(e) =>
                                handleInputChange("linkedinUrl", e.target.value)
                              }
                              placeholder="https://www.linkedin.com/in/yourprofile"
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label
                            htmlFor="portfolio"
                            className="text-gray-700 mb-2 block"
                          >
                            Portfolio
                          </Label>
                          <div className="relative">
                            <Input
                              id="portfolio"
                              value={formData.portfolioUrl}
                              onChange={(e) =>
                                handleInputChange("portfolioUrl", e.target.value)
                              }
                              placeholder="https://yourportfolio.com"
                              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Terms & Submit Section */}
                  <motion.div
                    variants={cardReveal}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    transition={{ delay: 0.6 }}
                    whileHover="visible"
                  >
                    <motion.div variants={floatingCard}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="mb-6"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreedToTerms}
                            onCheckedChange={(checked) =>
                              handleInputChange("agreedToTerms", checked)
                            }
                            className="border-gray-300 data-[state=checked]:bg-blue-500"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm text-gray-700"
                          >
                            I agree to the terms and conditions and consent to the
                            processing of my personal data.
                          </Label>
                        </div>
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full relative group overflow-hidden bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-blue-700/50"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-20 h-20 rounded-full border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                  variants={successCheckmark}
                  initial="hidden"
                  animate="visible"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Application Submitted!
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Thank you for applying. We will review your application and
                  get back to you soon.
                </motion.p>
                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      position: "",
                      resume: null,
                      noticePeriod: undefined,
                      coverLetter: "",
                      skills: [],
                      experience: "",
                      linkedinUrl: "",
                      portfolioUrl: "",
                      agreedToTerms: false,
                    });
                  }}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Apply Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
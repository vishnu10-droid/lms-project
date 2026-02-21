import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddStudent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    guardianName: "",
    guardianPhone: "",
    course: "",
    enrollmentDate: "",
    rollNumber: "",
    studentId: "",
    previousEducation: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Submitted:", form);
  };

  return (
    <div className="w-full p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
          <PlusCircle size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
          <p className="text-gray-500">Fill out the information to enroll a student</p>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Student Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Fields */}
          <InputField label="First Name" name="firstName" value={form.firstName} handleChange={handleChange} />

          <InputField label="Last Name" name="lastName" value={form.lastName} handleChange={handleChange} />

          <InputField label="Email" name="email" type="email" value={form.email} handleChange={handleChange} />

          <InputField label="Phone Number" name="phone" type="number" value={form.phone} handleChange={handleChange} />

          <InputField label="Date of Birth" name="dob" type="date" value={form.dob} handleChange={handleChange} />

          <SelectField
            label="Gender"
            name="gender"
            value={form.gender}
            handleChange={handleChange}
            options={["Male", "Female", "Other"]}
          />

          <InputField
            label="Full Address"
            name="address"
            value={form.address}
            handleChange={handleChange}
            className="md:col-span-2"
          />

          <InputField label="City" name="city" value={form.city} handleChange={handleChange} />

          <InputField label="State" name="state" value={form.state} handleChange={handleChange} />

          <InputField label="Pincode" name="pincode" type="number" value={form.pincode} handleChange={handleChange} />

          <InputField label="Guardian Name" name="guardianName" value={form.guardianName} handleChange={handleChange} />

          <InputField
            label="Guardian Phone"
            name="guardianPhone"
            type="number"
            value={form.guardianPhone}
            handleChange={handleChange}
          />

          <SelectField
            label="Course Enrollment"
            name="course"
            value={form.course}
            handleChange={handleChange}
            options={["Frontend Development", "MERN Stack", "AI & ML", "Data Science"]}
          />

          <InputField
            label="Enrollment Date"
            name="enrollmentDate"
            type="date"
            value={form.enrollmentDate}
            handleChange={handleChange}
          />

          <InputField label="Roll Number" name="rollNumber" value={form.rollNumber} handleChange={handleChange} />

          <InputField label="Student ID" name="studentId" value={form.studentId} handleChange={handleChange} />

          <div className="md:col-span-2">
            <label className="form-label">Previous Education</label>
            <textarea
              name="previousEducation"
              value={form.previousEducation}
              onChange={handleChange}
              className="form-input h-24"
            />
          </div>

          <div className="md:col-span-2">
            <label className="form-label">Upload Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition shadow-md"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

/* ---------------------- Reusable Components ---------------------- */

function InputField({ label, name, value, handleChange, type = "text", className }) {
  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="form-input"
        required
      />
    </div>
  );
}

function SelectField({ label, name, value, handleChange, options }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select name={name} value={value} onChange={handleChange} className="form-input" required>
        <option value="">Select...</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
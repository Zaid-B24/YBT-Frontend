import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Phone, MapPin, Lock, Bell, Shield } from "lucide-react";
import MyBookingsTab from "./MyBookingsTab";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProfileTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ProfileSubtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#fff" : "#666")};
  padding: 1rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background: #fff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:after {
      display: none;
    }
  }
`;

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;

  option {
    background: #333;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SaveButton = styled.button`
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #f0f0f0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SettingsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingsLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SettingsTitle = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SettingsDescription = styled.div`
  font-size: 0.8rem;
  color: #ccc;
`;

const Toggle = styled.input`
  appearance: none;
  width: 50px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;

  &:checked {
    background: #fff;
  }

  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    background: #000;
    transform: translateX(26px);
  }
`;

const ProfilePage = () => {
  const { user, updateUserProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setPersonalInfo({
        firstName: firstName,
        lastName: lastName,
        email: user.email || "",
        phone: user.phoneNumber || "",
        dateOfBirth: user.DOB
          ? new Date(user.DOB).toISOString().split("T")[0]
          : "",
        gender: user.gender || "Male",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        country: user.country || "India",
      });
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    securityAlerts: true,
    twoFactorAuth: false,
  });

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "bookings", label: "Bookings" },
    { id: "password", label: "Password" },
    { id: "preferences", label: "Preferences" },
  ];

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePreferenceChange = (e) => {
    setPreferences((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatePayload = {
      name: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
      phoneNumber: personalInfo.phone,
      DOB: personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : null,
      gender: personalInfo.gender,
      address: personalInfo.address,
      city: personalInfo.city,
      state: personalInfo.state,
      zipCode: personalInfo.zipCode,
      country: personalInfo.country,
    };

    try {
      await updateUserProfile(updatePayload);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword,
      });

      alert(result.message || "Password changed successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Preferences saved successfully!");
    } catch (error) {
      alert("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <TabContent>
            <form onSubmit={handleSavePersonalInfo}>
              <FormGrid>
                <FormGroup>
                  <FormLabel>
                    <User size={16} />
                    First Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <User size={16} />
                    Last Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <Mail size={16} />
                    Email Address
                  </FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    required
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <Phone size={16} />
                    Phone Number
                  </FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormInput
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Gender</FormLabel>
                  <FormSelect
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup style={{ gridColumn: "1 / -1" }}>
                  <FormLabel>
                    <MapPin size={16} />
                    Address
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>City</FormLabel>
                  <FormInput
                    type="text"
                    name="city"
                    value={personalInfo.city}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>State</FormLabel>
                  <FormInput
                    type="text"
                    name="state"
                    value={personalInfo.state}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormInput
                    type="text"
                    name="zipCode"
                    value={personalInfo.zipCode}
                    onChange={handlePersonalInfoChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Country</FormLabel>
                  <FormSelect
                    name="country"
                    value={personalInfo.country}
                    onChange={handlePersonalInfoChange}
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </FormSelect>
                </FormGroup>
              </FormGrid>

              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </SaveButton>
            </form>
          </TabContent>
        );

      case "bookings":
        return <MyBookingsTab />;

      case "password":
        return (
          <TabContent>
            <form onSubmit={handleChangePassword}>
              <FormGroup>
                <FormLabel>
                  <Lock size={16} />
                  Current Password
                </FormLabel>
                <FormInput
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <Lock size={16} />
                  New Password
                </FormLabel>
                <FormInput
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="8"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <Lock size={16} />
                  Confirm New Password
                </FormLabel>
                <FormInput
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="8"
                />
              </FormGroup>

              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Change Password"}
              </SaveButton>
            </form>
          </TabContent>
        );

      case "preferences":
        return (
          <TabContent>
            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>
                  <Bell size={16} />
                  Email Notifications
                </SettingsTitle>
                <SettingsDescription>
                  Receive general notifications via email
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="emailNotifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>
                  <Phone size={16} />
                  SMS Notifications
                </SettingsTitle>
                <SettingsDescription>
                  Receive important updates via SMS
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="smsNotifications"
                checked={preferences.smsNotifications}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>
                  <Mail size={16} />
                  Marketing Emails
                </SettingsTitle>
                <SettingsDescription>
                  Receive promotional offers and news
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="marketingEmails"
                checked={preferences.marketingEmails}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>Order Updates</SettingsTitle>
                <SettingsDescription>
                  Get notified about order status changes
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="orderUpdates"
                checked={preferences.orderUpdates}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>
                  <Shield size={16} />
                  Security Alerts
                </SettingsTitle>
                <SettingsDescription>
                  Get notified about account security events
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="securityAlerts"
                checked={preferences.securityAlerts}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SettingsGroup>
              <SettingsLabel>
                <SettingsTitle>
                  <Shield size={16} />
                  Two-Factor Authentication
                </SettingsTitle>
                <SettingsDescription>
                  Add an extra layer of security to your account
                </SettingsDescription>
              </SettingsLabel>
              <Toggle
                type="checkbox"
                name="twoFactorAuth"
                checked={preferences.twoFactorAuth}
                onChange={handlePreferenceChange}
              />
            </SettingsGroup>

            <SaveButton onClick={handleSavePreferences} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </SaveButton>
          </TabContent>
        );

      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>My Profile</ProfileTitle>
          <ProfileSubtitle>
            Manage your account settings and preferences
          </ProfileSubtitle>
        </ProfileHeader>

        <TabsContainer>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>

        {renderTabContent()}
      </ProfileContainer>
    </PageWrapper>
  );
};

export default ProfilePage;

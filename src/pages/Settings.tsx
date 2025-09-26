"use client";

import PageLayout from "@/components/PageLayout";
import GitHubSettings from "@/components/GitHubSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Github, 
  User,
  Bell,
  Palette,
  Shield
} from "lucide-react";

const Settings = () => {
  return (
    <PageLayout
      title="Settings"
      description="Configure your ContentAI experience and integrations"
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* GitHub Integration */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Github className="h-5 w-5" />
            <h2 className="text-xl font-semibold">GitHub Integration</h2>
            <Badge variant="outline">Pro Feature</Badge>
          </div>
          <GitHubSettings />
        </section>

        {/* General Settings */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5" />
            <h2 className="text-xl font-semibold">General Settings</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">General application settings coming soon...</p>
            </CardContent>
          </Card>
        </section>

        {/* User Profile */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold">User Profile</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Profile management coming soon...</p>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification settings coming soon...</p>
            </CardContent>
          </Card>
        </section>

        {/* Appearance */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Theme & Display</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Theme settings are handled by the theme toggle in the header</p>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Security */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Privacy & Security</h2>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings coming soon...</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default Settings;
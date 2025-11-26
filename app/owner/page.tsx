"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-orange-950/20 to-yellow-950/20" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Owner Yönetim Paneli
              </h1>
              <p className="text-muted-foreground">Tam Sistem Kontrolü ve Ultra Kapsamlı Ayarlar</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Dumbbell className="w-4 h-4" />
                {t("home")}
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-6">
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Kullanıcılar
            </TabsTrigger>
            <TabsTrigger value="admins">
              <Shield className="w-4 h-4 mr-2" />
              Adminler
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Lock className="w-4 h-4 mr-2" />
              İzinler
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="w-4 h-4 mr-2" />
              Sistem
            </TabsTrigger>
            <TabsTrigger value="database">
              <Database className="w-4 h-4 mr-2" />
              Veritabanı
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analitik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <Card className="p-6 glass-effect border-amber-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Toplam Kullanıcı</p>
                    <p className="text-2xl font-bold">{users.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-effect border-green-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aktif</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-effect border-blue-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adminler</p>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.role === "admin" || u.role === "superadmin").length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-effect border-purple-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fizyoterapistler</p>
                    <p className="text-2xl font-bold">{users.filter((u) => u.role === "physiotherapist").length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setIsCreatingUser(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Yeni Kullanıcı Oluştur
              </Button>
            </div>

            {isCreatingUser && (
              <Card className="p-8 glass-effect border-amber-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <UserPlus className="w-6 h-6 text-amber-500" />
                    Yeni Kullanıcı Oluştur
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsCreatingUser(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName">Ad *</Label>
                    <Input
                      id="firstName"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                      placeholder="Kullanıcı adı"
                      className="bg-black/20 border-border/50"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="lastName">Soyad *</Label>
                    <Input
                      id="lastName"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                      placeholder="Kullanıcı soyadı"
                      className="bg-black/20 border-border/50"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email">E-posta *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="kullanici@email.com"
                        className="pl-10 bg-black/20 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        placeholder="+90 555 123 4567"
                        className="pl-10 bg-black/20 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="role">Rol *</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger className="bg-black/20 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Üye</SelectItem>
                        <SelectItem value="doctor">Doktor</SelectItem>
                        <SelectItem value="physiotherapist">Fizyoterapist</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="gender">Cinsiyet *</Label>
                    <Select value={newUser.gender} onValueChange={(value) => setNewUser({ ...newUser, gender: value })}>
                      <SelectTrigger className="bg-black/20 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="erkek">Erkek</SelectItem>
                        <SelectItem value="kadin">Kadın</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newUser.role === "member" && (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="membershipType">Üyelik Tipi</Label>
                        <Select
                          value={newUser.membershipType}
                          onValueChange={(value) => setNewUser({ ...newUser, membershipType: value })}
                        >
                          <SelectTrigger className="bg-black/20 border-border/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Pro">Pro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="duration">Süre (Ay)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={newUser.duration}
                          onChange={(e) => setNewUser({ ...newUser, duration: e.target.value })}
                          placeholder="1"
                          min="1"
                          max="12"
                          className="bg-black/20 border-border/50"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="password">Şifre *</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-black/20 border-border/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="notes">Notlar</Label>
                    <Textarea
                      id="notes"
                      value={newUser.notes}
                      onChange={(e) => setNewUser({ ...newUser, notes: e.target.value })}
                      placeholder="Kullanıcı hakkında notlar..."
                      className="bg-black/20 border-border/50 min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setIsCreatingUser(false)}>
                    İptal
                  </Button>
                  <Button
                    onClick={handleCreateUser}
                    disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Kullanıcı Oluştur
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-8 glass-effect border-amber-500/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-500" />
                Tüm Kullanıcılar
              </h2>

              <div className="space-y-4">
                {users.map((user) => (
                  <Card
                    key={user.id}
                    className="p-6 glass-effect border-border/50 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className={`w-12 h-12 border-2 bg-gradient-to-br ${getRoleColor(user.role)}`}>
                          <AvatarFallback className="text-white font-bold">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold">{user.name}</h3>
                            <Badge variant="outline" className="gap-1">
                              {getRoleIcon(user.role)}
                              {getRoleDisplayName(user.role)}
                            </Badge>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "inactive"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status === "active" ? "Aktif" : user.status === "suspended" ? "Askıda" : "Pasif"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                          <p className="text-sm text-muted-foreground mb-2">{user.phone}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Kayıt: {user.createdAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Son giriş: {user.lastLogin}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {user.permissions.length} İzin
                            </Badge>
                            {user.membershipType && (
                              <Badge variant="secondary" className="text-xs">
                                {user.membershipType} - {user.duration} Ay
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="bg-transparent"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Düzenle
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Kullanıcı İzinlerini Düzenle - {user.name}</DialogTitle>
                              <DialogDescription>Bu kullanıcı için manuel izin ayarları yapın</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                              {Object.entries(
                                allPermissions.reduce(
                                  (acc, perm) => {
                                    if (!acc[perm.category]) acc[perm.category] = []
                                    acc[perm.category].push(perm)
                                    return acc
                                  },
                                  {} as Record<string, Permission[]>,
                                ),
                              ).map(([category, perms]) => (
                                <div key={category}>
                                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-amber-500" />
                                    {category}
                                  </h3>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    {perms.map((perm) => (
                                      <Card key={perm.id} className="p-3 glass-effect border-border/50">
                                        <div className="flex items-start gap-3">
                                          <Checkbox
                                            checked={editingUser?.permissions.includes(perm.id)}
                                            onCheckedChange={(checked) => {
                                              if (editingUser) {
                                                const newPermissions = checked
                                                  ? [...editingUser.permissions, perm.id]
                                                  : editingUser.permissions.filter((p) => p !== perm.id)
                                                setEditingUser({ ...editingUser, permissions: newPermissions })
                                              }
                                            }}
                                          />
                                          <div className="flex-1">
                                            <h4 className="font-semibold text-sm mb-1">{perm.name}</h4>
                                            <p className="text-xs text-muted-foreground">{perm.description}</p>
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                              <Button variant="outline" onClick={() => setEditingUser(null)}>
                                İptal
                              </Button>
                              <Button
                                onClick={() => {
                                  if (editingUser) {
                                    handleUpdatePermissions(editingUser.id, editingUser.permissions)
                                    setEditingUser(null)
                                  }
                                }}
                                className="bg-gradient-to-r from-amber-600 to-orange-600"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Kaydet
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendUser(user.id)}
                          className="bg-transparent text-orange-500 hover:text-orange-600 hover:border-orange-500"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {user.status === "suspended" ? "Aktifleştir" : "Askıya Al"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-transparent text-red-500 hover:text-red-600 hover:border-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Sil
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="admins" className="space-y-6">
            <Card className="p-8 glass-effect border-amber-500/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-500" />
                Admin ve Superadmin Yönetimi
              </h2>

              <div className="space-y-4">
                {users
                  .filter((u) => u.role === "admin" || u.role === "superadmin")
                  .map((user) => (
                    <Card key={user.id} className="p-6 glass-effect border-border/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className={`w-12 h-12 border-2 bg-gradient-to-br ${getRoleColor(user.role)}`}>
                            <AvatarFallback className="text-white font-bold">
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold">{user.name}</h3>
                              <Badge variant="outline" className="gap-1">
                                {getRoleIcon(user.role)}
                                {getRoleDisplayName(user.role)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                            <p className="text-sm text-muted-foreground mb-3">{user.phone}</p>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {user.permissions.length} İzin Aktif
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                className="bg-transparent"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                İzinleri Düzenle
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Admin İzinlerini Düzenle - {user.name}</DialogTitle>
                                <DialogDescription>Bu admin için detaylı izin ayarları yapın</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6 mt-4">
                                {Object.entries(
                                  allPermissions.reduce(
                                    (acc, perm) => {
                                      if (!acc[perm.category]) acc[perm.category] = []
                                      acc[perm.category].push(perm)
                                      return acc
                                    },
                                    {} as Record<string, Permission[]>,
                                  ),
                                ).map(([category, perms]) => (
                                  <div key={category}>
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                      <Zap className="w-5 h-5 text-amber-500" />
                                      {category}
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      {perms.map((perm) => (
                                        <Card key={perm.id} className="p-3 glass-effect border-border/50">
                                          <div className="flex items-start gap-3">
                                            <Checkbox
                                              checked={editingUser?.permissions.includes(perm.id)}
                                              onCheckedChange={(checked) => {
                                                if (editingUser) {
                                                  const newPermissions = checked
                                                    ? [...editingUser.permissions, perm.id]
                                                    : editingUser.permissions.filter((p) => p !== perm.id)
                                                  setEditingUser({ ...editingUser, permissions: newPermissions })
                                                }
                                              }}
                                            />
                                            <div className="flex-1">
                                              <h4 className="font-semibold text-sm mb-1">{perm.name}</h4>
                                              <p className="text-xs text-muted-foreground">{perm.description}</p>
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-end gap-3 mt-6">
                                <Button variant="outline" onClick={() => setEditingUser(null)}>
                                  İptal
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (editingUser) {
                                      handleUpdatePermissions(editingUser.id, editingUser.permissions)
                                      setEditingUser(null)
                                    }
                                  }}
                                  className="bg-gradient-to-r from-amber-600 to-orange-600"
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Kaydet
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuspendUser(user.id)}
                            className="bg-transparent text-orange-500 hover:text-orange-600 hover:border-orange-500"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            {user.status === "suspended" ? "Aktifleştir" : "Askıya Al"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-transparent text-red-500 hover:text-red-600 hover:border-red-500"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Sil
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="p-8 glass-effect border-amber-500/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-amber-500" />
                Rol Bazlı İzin Yönetimi
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rolePermissionTemplates.map((roleTemplate) => (
                  <Card key={roleTemplate.role} className="p-6 glass-effect border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold capitalize">{getRoleDisplayName(roleTemplate.role)}</h3>
                      <Badge variant="outline" className="gap-1">
                        {getRoleIcon(roleTemplate.role)} {roleTemplate.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Bu rol için tanımlanmış izinler.</p>
                    <div className="flex flex-wrap gap-1 mb-6">
                      {roleTemplate.permissions.slice(0, 5).map((permId) => (
                        <Badge key={permId} variant="secondary" className="text-xs">
                          {allPermissions.find((p) => p.id === permId)?.name || permId}
                        </Badge>
                      ))}
                      {roleTemplate.permissions.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{roleTemplate.permissions.length - 5} Diğer
                        </Badge>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent hover:bg-white/10"
                          onClick={() => {
                            setEditingUser({
                              ...roleTemplate,
                              id: roleTemplate.role, // Temporary id for editing
                              name: getRoleDisplayName(roleTemplate.role),
                              firstName: "",
                              lastName: "",
                              email: "",
                              phone: "",
                              status: "active",
                              createdAt: "",
                              lastLogin: "",
                              gender: "erkek",
                              permissions: [...roleTemplate.permissions],
                            })
                            setIsEditingPermissions(true)
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          İzinleri Düzenle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{getRoleDisplayName(roleTemplate.role)} İzinlerini Düzenle</DialogTitle>
                          <DialogDescription>Bu rol için izinleri seçin veya kaldırın.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          {Object.entries(
                            allPermissions.reduce(
                              (acc, perm) => {
                                if (!acc[perm.category]) acc[perm.category] = []
                                acc[perm.category].push(perm)
                                return acc
                              },
                              {} as Record<string, Permission[]>,
                            ),
                          ).map(([category, perms]) => (
                            <div key={category}>
                              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" />
                                {category}
                              </h3>
                              <div className="grid md:grid-cols-2 gap-3">
                                {perms.map((perm) => (
                                  <Card key={perm.id} className="p-3 glass-effect border-border/50">
                                    <div className="flex items-start gap-3">
                                      <Checkbox
                                        checked={editingUser?.permissions.includes(perm.id)}
                                        onCheckedChange={(checked) => {
                                          if (editingUser) {
                                            const newPermissions = checked
                                              ? [...editingUser.permissions, perm.id]
                                              : editingUser.permissions.filter((p) => p !== perm.id)
                                            setEditingUser({ ...editingUser, permissions: newPermissions })
                                          }
                                        }}
                                      />
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">{perm.name}</h4>
                                        <p className="text-xs text-muted-foreground">{perm.description}</p>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingPermissions(false)
                              setEditingUser(null)
                            }}
                          >
                            İptal
                          </Button>
                          <Button
                            onClick={() => {
                              if (editingUser && editingUser.id !== "") {
                                // Check if it's a role template editing
                                handleUpdateRoleTemplate(editingUser.id as User["role"], editingUser.permissions)
                                setIsEditingPermissions(false)
                                setEditingUser(null)
                              }
                            }}
                            className="bg-gradient-to-r from-amber-600 to-orange-600"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Kaydet
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="p-8 glass-effect border-amber-500/30">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-amber-500" />
                Genel Sistem Ayarları
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="siteName">Site Adı</Label>
                  <Input
                    id="siteName"
                    value={systemSettings.siteName}
                    onChange={(e) => handleUpdateSystemSettings("siteName", e.target.value)}
                    placeholder="FitnessApp Pro"
                    className="bg-black/20 border-border/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={systemSettings.siteUrl}
                    onChange={(e) => handleUpdateSystemSettings("siteUrl", e.target.value)}
                    placeholder="https://fitnessapp.com"
                    className="bg-black/20 border-border/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-border/50 glass-effect">
                  <Switch
                    id="maintenanceMode"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleUpdateSystemSettings("maintenanceMode", checked)}
                  />
                  <Label htmlFor="maintenanceMode">Bakım Modu</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-border/50 glass-effect">
                  <Switch
                    id="registrationEnabled"
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) => handleUpdateSystemSettings("registrationEnabled", checked)}
                  />
                  <Label htmlFor="registrationEnabled">Kayıtlar Açık</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-border/50 glass-effect">
                  <Switch
                    id="emailVerification"
                    checked={systemSettings.emailVerification}
                    onCheckedChange={(checked) => handleUpdateSystemSettings("emailVerification", checked)}
                  />
                  <Label htmlFor="emailVerification">E-posta Doğrulama</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-border/50 glass-effect">
                  <Switch
                    id="twoFactorAuth"
                    checked={systemSettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleUpdateSystemSettings("twoFactorAuth", checked)}
                  />
                  <Label htmlFor="twoFactorAuth">İki Faktörlü Kimlik Doğrulama</Label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <Label htmlFor="sessionTimeout">Oturum Zaman Aşımı (Dakika)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => handleUpdateSystemSettings("sessionTimeout", Number.parseInt(e.target.value))}
                    min="1"
                    className="bg-black/20 border-border/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="maxLoginAttempts">Maksimum Giriş Denemesi</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={systemSettings.maxLoginAttempts}
                    onChange={(e) => handleUpdateSystemSettings("maxLoginAttempts", Number.parseInt(e.target.value))}
                    min="1"
                    className="bg-black/20 border-border/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="passwordMinLength">Şifre Minimum Uzunluk</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={systemSettings.passwordMinLength}
                    onChange={(e) => handleUpdateSystemSettings("passwordMinLength", Number.parseInt(e.target.value))}
                    min="4"
                    className="bg-black/20 border-border/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="dataRetentionDays">Veri Saklama (Gün)</Label>
                  <Input
                    id="dataRetentionDays"
                    type="number"
                    value={systemSettings.dataRetentionDays}
                    onChange={(e) => handleUpdateSystemSettings("dataRetentionDays", Number.parseInt(e.target.value))}
                    min="30"
                    className="bg-black/20 border-border/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <Label htmlFor="backupFrequency">Yedekleme Sıklığı</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => handleUpdateSystemSettings("backupFrequency", value)}
                  >
                    <SelectTrigger className="bg-black/20 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Günlük</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                      <SelectItem value="monthly">Aylık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="apiRateLimit">API İstek Sınırı (Saniyede)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={systemSettings.apiRateLimit}
                    onChange={(e) => handleUpdateSystemSettings("apiRateLimit", Number.parseInt(e.target.value))}
                    min="10"
                    className="bg-black/20 border-border/50"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleSaveSystemSettings}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sistem Ayarlarını Kaydet
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <Card
                className="p-6 glass-effect border-blue-500/30 cursor-pointer hover:border-blue-400/50 transition-all"
                onClick={handleDatabaseBackup}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Save className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Veritabanı Yedeği Oluştur</p>
                </div>
              </Card>

              <Card
                className="p-6 glass-effect border-red-500/30 cursor-pointer hover:border-red-400/50 transition-all"
                onClick={handleDatabaseRestore}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Veritabanını Geri Yükle</p>
                </div>
              </Card>

              <Card
                className="p-6 glass-effect border-purple-500/30 cursor-pointer hover:border-purple-400/50 transition-all"
                onClick={handleDatabaseOptimize}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Veritabanını Optimize Et</p>
                </div>
              </Card>

              <Card
                className="p-6 glass-effect border-gray-500/30 cursor-pointer hover:border-gray-400/50 transition-all"
                onClick={handleDatabaseCleanup}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-500/20 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Eski Verileri Temizle</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="p-8 glass-effect border-cyan-500/30 lg:col-span-2">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cyan-500" />
                  Kullanıcı Büyüme Grafiği
                </h3>
                <div className="h-64 flex items-center justify-center bg-black/30 rounded-lg border border-dashed border-border/50">
                  <p className="text-muted-foreground">Grafik verisi yükleniyor...</p>
                </div>
              </Card>
              <Card className="p-8 glass-effect border-teal-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-teal-500" />
                  Kullanıcı Rol Dağılımı
                </h3>
                <div className="h-64 flex items-center justify-center bg-black/30 rounded-lg border border-dashed border-border/50">
                  <p className="text-muted-foreground">Grafik verisi yükleniyor...</p>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 glass-effect border-amber-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-amber-500" />
                    Son Raporlar
                  </h3>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Tümünü Gör
                  </Button>
                </div>
                <div className="space-y-3">
                  {["Kullanıcı Aktivite Raporu", "Gelir Raporu", "Egzersiz Tamamlama Raporu"].map((report, i) => (
                    <div key={i} className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{report}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(Date.now() - (i + 1) * 86400000).toLocaleDateString()}
                        </span>
                        <Download className="w-3 h-3 text-green-500 cursor-pointer hover:text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 glass-effect border-indigo-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-500" />
                    Sistem Metrikleri
                  </h3>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <RefreshCw className="w-3 h-3 mr-1" /> Yenile
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">CPU Kullanımı</p>
                    <p className="font-bold text-lg">75%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bellek Kullanımı</p>
                    <p className="font-bold text-lg">60%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Disk Kullanımı</p>
                    <p className="font-bold text-lg">45%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ağ Trafiği (Gelen)</p>
                    <p className="font-bold text-lg">1.2 Gbps</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}
